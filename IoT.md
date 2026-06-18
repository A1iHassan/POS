# IoT-Shabaka

[![CI Build](https://github.com/IoT-Shabaka/IoT-Shabaka/actions/workflows/build-test-deploy.yml/badge.svg)](https://github.com/IoT-Shabaka/IoT-Shabaka/actions/workflows/build-test-deploy.yml)

End‑to‑end (ingest → decode → store → serve/stream) LoRaWAN sensor data platform built as a set of focused, independently deployable microservices.

---

## 1. High‑Level Architecture

Data path (fanout at each stage):

```
Loriot MQTT  ──>  loriot-client  ── raw uplinks ──>  RabbitMQ (loriot.raw.exchange)
                                                  │              │
                                                  │              └────> rmq2ts (persist raw)
                                                  └────> sensor-processor (decode) ── decoded ──> RabbitMQ (loriot.decoded.exchange)
                                                                                                        │              │
                                                                                                        │              └────> rmq2ts (persist decoded)
                                                                                                        └────> api-gateway (SSE / APIs / gRPC)
```

Supporting components: TimescaleDB (time‑series), General Postgres DB (metadata, auth, decoders), Redis (decoder + metadata cache), Prometheus/Grafana (metrics), Nginx reverse proxy, Certbot (optional TLS), Front-end (React dashboard).

RabbitMQ exchanges (fanout unless noted):

- `loriot.raw.exchange` → consumed by `sensor-processor`, `rmq2ts`
- `loriot.decoded.exchange` → consumed by `rmq2ts`, `api-gateway`
- `loriot.events.exchange` (events / errors)
- `loriot.subscriptions.direct` (direct) for subscription mgmt
- `sensor.cache.invalidation.direct` (direct) for cache busting

---

## 2. Services Overview

| Service              | Lang                | Purpose                                                                                           | External Ports (default)                   |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| loriot-client        | Go                  | Multi-protocol LoRaWAN data ingestion (MQTT over TLS) with gRPC-managed dynamic subscriptions     | 8081 (metrics)                             |
| sensor-processor     | Go                  | Decode raw payloads in hardened V8Go isolates with batch processing support, publish decoded JSON | 3000 (HTTP / metrics), 50052 (gRPC server) |
| rmq2ts               | Go                  | Dual consumer: raw & decoded → TimescaleDB persistence with multi-tenant isolation & aggregations | 8080 (HTTP API)                            |
| api-gateway          | Python/FastAPI      | Multi-tenant REST & gRPC APIs, SSE streaming, JWT auth, workspace management, audit logging       | 8000 (HTTP), 50051 (gRPC server)           |
| front-end            | React 19/TypeScript | Multi-tenant dashboard UI with real-time data, device management, analytics (Vite + Bun)          | 8082 (dev server), 80 (Caddy production)   |
| timescaledb          | Postgres+Timescale  | Time‑series sensor storage                                                                        | 5432                                       |
| generaldb            | Postgres            | Metadata (sensors, catalog, auth, tenants)                                                        | 5433 (host)                                |
| redis                | Redis               | Low‑latency cache (decoders, metadata)                                                            | 6379                                       |
| rabbitmq             | RabbitMQ Mgmt       | Messaging backbone                                                                                | 5672 / 15672                               |
| prometheus / grafana |                     | Metrics stack                                                                                     | 9090 / 3001                                |

Local and repository-driven development wiring lives in `docker-compose.yml`. The production deployment source is `prod_server/compose.yml`, which is deployed to the server as `compose.yml` from the deployment root.

---

## 3. Core Data Flow

1. `loriot-client` establishes MQTT (TLS) session with Loriot Network Server using `MQTT_*` variables, subscribes to application topics via gRPC-controlled dynamic subscription management, enriches messages with timestamps and metadata, publishes JSON to `loriot.raw.exchange`.
2. `sensor-processor` consumes raw messages, fetches sensor + decoder metadata via gRPC from `api-gateway` with Redis caching, selects decoder through catalog mapping, executes JavaScript in constrained V8Go isolates with security analysis, supports batch message processing for multi-reading sensors, emits processed data to `loriot.decoded.exchange`.
3. `rmq2ts` dual-consumes raw + decoded streams with intelligent batch/single mode detection, writes to TimescaleDB hypertables with workspace-based multi-tenant isolation, performs device-to-workspace mapping via gRPC calls with Redis caching, applies retention policies.
4. `api-gateway` provides multi-tenant FastAPI REST & gRPC services, manages JWT authentication with workspace-scoped access control, consumes decoded stream for real-time SSE fanout with workspace filtering, comprehensive audit logging, device and decoder catalog management.
5. `front-end` React 19/TypeScript SPA connects via RTK Query to REST APIs, subscribes to SSE for real-time updates, provides multi-tenant dashboard with device management, analytics, and system monitoring.

---

## 4. Environment Configuration (By Service)

Below: principal environment variables actually referenced in current codebase (defaults shown). Use `.env` files per service; secrets must be overridden in production.

### loriot-client

**Primary ingestion mode uses MQTT over TLS**. Enhanced gRPC server for dynamic subscription management.

Required (MQTT mode):

- `MQTT_BROKER_HOST`, `MQTT_BROKER_PORT` (MQTT broker connection)
- `MQTT_USERNAME`, `MQTT_PASSWORD` (authentication)
- `MQTT_CLIENT_ID`, `MQTT_TOPIC_PREFIX` (client identification)

Key MQTT options:

- `MQTT_QOS` (1), `MQTT_RETAIN` (false), `MQTT_CLEAN_SESSION` (true)
- `MQTT_KEEP_ALIVE_SECONDS` (60), `MQTT_CONNECT_TIMEOUT_SECONDS` (30)
- `MQTT_MESSAGE_TIMEOUT_SECONDS` (30), `MQTT_RECONNECT_DELAY_SECONDS` (5)
- `MQTT_USE_TLS` (true), `MQTT_CA_CERT_PATH` (./ca.crt)

RabbitMQ publication:

- `RABBITMQ_URL`, `RABBITMQ_EXCHANGE_NAME` (loriot.raw.exchange)
- `RABBITMQ_EVENTS_EXCHANGE_NAME` (loriot.events.exchange)
- `RABBITMQ_EXCHANGE_TYPE` (fanout)

gRPC client & metrics:

- `METRICS_PORT` (8081)
- `API_GATEWAY_GRPC_ADDRESS` plus keepalive configuration
- Dynamic subscription management for device EUIs

**Deprecated**: Legacy WebSocket variables are retained for future downlink features but inactive by default.

### sensor-processor

- Server: `HOST` (0.0.0.0), `PORT` (3000), `GIN_MODE` (development)
- Sandbox: `SANDBOX_TIMEOUT` (ms, 5000), `SANDBOX_MEMORY_LIMIT` (bytes, 52428800), `SANDBOX_MAX_CODE_SIZE` (102400), `SANDBOX_MAX_OUTPUT_SIZE` (10240), `WORKER_POOL_SIZE` (4), `WORKER_TIMEOUT` (10000), lazy loading toggles (`SANDBOX_LAZY_LOADING`, `SANDBOX_IDLE_TIMEOUT`, `SANDBOX_MIN_POOL_SIZE`)
- gRPC: same keepalive vars + `API_GATEWAY_GRPC_ADDRESS`
- Redis: `REDIS_URL` (redis://redis:6379) OR granular `REDIS_HOST`, `REDIS_PORT`, `REDIS_TTL`, etc.
- RabbitMQ: `RABBITMQ_URL` (amqp://guest:guest@rabbitmq:5672/), retry controls
- Exchanges: `RAW_EXCHANGE`, `DECODED_EXCHANGE`, `CACHE_INVALIDATION_EXCHANGE`
- Security / limiting: `RATE_LIMIT_WINDOW`, `RATE_LIMIT_MAX`, `RATE_LIMIT_EXECUTE_WINDOW`, `RATE_LIMIT_EXECUTE_MAX`, length/context limits
- Logging: `LOG_LEVEL`, `LOG_FILE`

### rmq2ts

**Multi-tenant dual consumer with intelligent message processing**:

- `DATABASE_URL` (postgres://postgres:password@timescaledb:5432/iot_sensors)
- `RABBITMQ_URL`, `RAW_EXCHANGE`, `DECODED_EXCHANGE`, `DECODED_QUEUE`, `EVENTS_EXCHANGE`
- HTTP API: `PORT` (8080) for data retrieval and monitoring endpoints
- Multi-tenant: All data workspace-scoped with `tenant_id` isolation
- gRPC Client: `API_GATEWAY_GRPC_ADDRESS` for device-to-workspace mapping with Redis caching
- Connection pooling: `DB_MAX_OPEN_CONNS`, `DB_MAX_IDLE_CONNS`, `DB_CONN_MAX_LIFETIME`, `DB_CONN_MAX_IDLE_TIME`
- Intelligent Processing: Automatic batch/single mode detection, out-of-order message buffering
- Redis caching: `REDIS_ADDRESS`, `SENSOR_CACHE_TTL` for sensor metadata and tenant mappings
- Timeouts: `SHUTDOWN_TIMEOUT`, `SERVICE_STOP_TIMEOUT`
- Performance: `METRICS_UPDATE_INTERVAL`, hypertable optimizations, efficient JSONB storage
- TimescaleDB features: Automatic hypertable creation, compression, time-bucket aggregations

### api-gateway

**Multi-tenant FastAPI with comprehensive auth and workspace management**:

Pydantic settings (all overridable via env):

- Primary DB: `DATABASE_URL` (asyncpg DSN to `generaldb`)
- Time-series DB: `TS_DATABASE_URL` (readonly TimescaleDB connection)
- HTTP: `PORT` (8000), `HOST` (0.0.0.0), `DEBUG` (false)
- gRPC: `GRPC_PORT` (50051), `GRPC_MAX_WORKERS` (10), shutdown grace periods
- Multi-tenant Auth: `SECRET_KEY`, `ALGORITHM` (HS256), `ACCESS_TOKEN_EXPIRE_MINUTES` (30), `REFRESH_TOKEN_EXPIRE_DAYS` (7)
- Security: Cookie flags (`COOKIE_SECURE`, `COOKIE_SAMESITE`, `ENVIRONMENT`), account lockout protection
- RabbitMQ: `RABBITMQ_URL`, `RABBITMQ_DECODED_EXCHANGE`, `RABBITMQ_SUBSCRIPTIONS_EXCHANGE`, `RABBITMQ_CACHE_INVALIDATION_EXCHANGE`
- Redis: `REDIS_URL` for session management and metadata caching
- Workspace Management: Complete multi-tenant isolation with role-based access control (RBAC)
- Comprehensive Features: JWT auth, audit logging, real-time SSE streaming, device management, decoder catalog
- Database Management: Alembic migrations, unified initialization system, workspace-scoped queries

### Shared Infrastructure

- RabbitMQ user/pass via compose `RABBITMQ_USER`, `RABBITMQ_PASS`
- Postgres credentials inside compose; override for production via secrets manager (NOT committed `.env`)
- Front-end build: `VITE_API_BASE_URL` (API Gateway base, injected at build time)
- Redis: Shared cache for sensor metadata, session management, and multi-tenant context

---

## 5. Decoder Pipeline & Security

**Enhanced V8Go execution with multi-layer security and batch processing (sensor-processor)**:

1. **Metadata Acquisition**: Fetch decoder script via gRPC from API gateway with Redis caching (TTL-based with invalidation).
2. **Multi-Layer Security Analysis**:
   - **Static Analysis**: Regex-based dangerous pattern detection (`eval`, `Function`, network/filesystem access)
   - **AST Analysis**: Abstract syntax tree parsing for structural code analysis and complexity scoring
   - **Risk Assessment**: Configurable risk scoring with strictness level enforcement
3. **V8Go Isolate Execution**: Run in pre-allocated isolate pool with strict resource limits (memory: 50MB, timeout: 5s, no Node.js APIs).
4. **Batch Processing Support**: Handle multi-reading sensors with interval-based or inferred timestamp calculation.
5. **Output Processing**: Normalize JSON output (measurements, metadata), apply data enrichment, publish to decoded exchange.
6. **Comprehensive Metrics**: Execution time, timeouts, failures, cache hits/misses, security violations, batch processing statistics.

**Cache invalidation** triggers via direct exchange `sensor.cache.invalidation.direct` ensure hot reload of updated decoders across all service instances.

---

## 6. Persistence Model (Multi-Tenant)

**TimescaleDB (iot_sensors)**: Hypertables store raw and decoded readings with workspace isolation. Each record includes `tenant_id` (workspace UUID) for strict multi-tenant separation. Raw data preserves complete LoRaWAN metadata (FCNT, RSSI, SNR, etc.). Decoded data uses flexible JSONB storage for device-agnostic sensor metrics. Automatic hypertable creation, time-bucket aggregations, and retention policies managed by rmq2ts.

**General DB (generaldb)**: Multi-tenant metadata with workspace-scoped resources:

- **Workspaces**: Tenant isolation with role-based membership
- **Devices**: Workspace-scoped with catalog relationships and audit trails
- **Sensor Catalog**: Manufacturer-defined decoder scripts with versioning
- **Authentication**: JWT-based with refresh tokens, account lockout, comprehensive audit logging
- **RBAC**: Hierarchical permissions with workspace inheritance
- **Audit System**: Complete action tracking with change history and IP logging

All database queries enforce workspace context to prevent cross-tenant data leakage.

---

## 7. APIs & Streaming

**API Gateway** provides comprehensive multi-tenant services:

- **REST API**: Multi-tenant CRUD (devices, workspaces, users), JWT authentication with refresh tokens, workspace management, role-based access control, comprehensive audit logging, device management, analytics, system health monitoring
- **gRPC Services**: High-performance internal communication for sensor metadata lookup, device-to-workspace mapping, heartbeat updates
- **Real-time SSE**: Workspace-filtered streaming of decoded sensor data with automatic client connection management
- **Multi-tenant Features**: Complete workspace isolation, role-based permissions, audit trails, session management

**Front-end** (React 19/TypeScript):

- **Modern Stack**: Vite 8 + Bun runtime, Tailwind CSS v4, RTK Query for API state management
- **Multi-tenant UI**: Workspace-aware dashboard, user management, device monitoring, analytics
- **Real-time Capabilities**: SSE integration for live sensor data, device status updates, system alerts
- **Production Ready**: Docker deployment with Caddy, comprehensive TypeScript typing, responsive design

**SSE Authentication**: Primary method via `Authorization` header with JWT bearer token; fallback query parameter support for browser/proxy compatibility.

---

## 8. Observability

Prometheus targets (per service) export:

- Process / Go runtime / Python runtime stats
- Message throughput, queue consumer lag, decode success vs timeout/errors
- DB connection pool gauges, query timings (Go services) and retention job metrics
- gRPC call latency + active connection counters

Grafana dashboards (provisioned) visualize ingestion → decode → persistence latency chain, per-decoder performance, tenant activity.

Health checks:

- Container health (`docker-compose.yml`) for readiness.
- Internal endpoints (e.g. `/api/v1/health`, rmq2ts HTTP server) include DB + RabbitMQ status.

---

## 9. Local Development

Prerequisites: Docker, Docker Compose, **Bun** (for front-end dev), Go 1.25+, Python 3.12+ (**uv** package manager), **V8Go requires CGO_ENABLED=1**.

Quick start (full stack):

```bash
docker compose pull
docker compose up -d
```

**Database initialization** (replaces separate seeding scripts):

```bash
docker compose exec api-gateway uv run python scripts/seed_database_refactored.py
```

**Front-end development** (React 19 + Vite 8):

```bash
cd front-end
bun install
bun run dev  # Starts on http://localhost:8082
```

**Service development**:

```bash
# Go services (sensor-processor, rmq2ts, loriot-client)
cd sensor-processor && go test ./...
make build  # Requires CGO_ENABLED=1 for V8Go

# API Gateway (Python + FastAPI)
cd api-gateway
uv install
uv run python main.py

# Generate gRPC stubs
./scripts/generate_grpc.sh
```

**Docker development** (use bake for multi-platform builds):

```bash
docker buildx bake --progress=plain
make dev  # Equivalent to docker compose up with development overrides
```

---

## 10. Adding a New Decoder

1. Create `<Name>_Decoder.js` in `catalogue_files/` exporting `decode(bytes, port)` or `decodeUplink(input)` with proper JSDoc metadata.
2. **Automatic Sync**: The unified initialization system (`scripts/seed_database_refactored.py`) automatically detects and syncs decoder files during database setup.
3. **Manual Sync**: Run database initialization to update catalog: `uv run python scripts/seed_database_refactored.py --catalog-only`
4. **Cache Invalidation**: Updated decoders trigger automatic cache invalidation across all sensor-processor instances.
5. **Security**: All decoders undergo multi-layer security analysis (static, AST, risk assessment) before execution.

**Decoder Requirements**: Must be compatible with V8Go isolates (no Node.js APIs), include proper JSDoc metadata for catalog integration, handle both single and batch message formats.

**Example JSDoc metadata**:

```javascript
/**
 * @manufacturer Milesight
 * @product AM103
 * @version 1.2.0
 * @description Indoor Air Quality Sensor
 */
function decodeUplink(input) {
  // Decoder implementation for V8Go
  return { data: { temperature: input.bytes[0] } };
}
```

---

## 11. Security Highlights

- **Multi-Tenant Isolation**: Workspace-based data segregation with role-based access control preventing cross-tenant access
- **Container Security**: Principle of least privilege with `cap_drop: ALL`, read-only filesystems, non-root execution
- **V8Go Sandbox Security**: Complete isolation with no Node.js APIs, multi-layer static analysis, AST validation, strict resource limits
- **Authentication**: JWT with refresh tokens, HTTP-only cookies, account lockout protection, comprehensive audit logging
- **Network Security**: TLS encryption for MQTT, secure gRPC communication, rate limiting middleware
- **Code Security**: Multi-layer decoder analysis, dynamic security scoring, configurable strictness levels
- **Data Protection**: Workspace-scoped queries, audit trails with IP tracking, secure session management
- **Secret Management**: Environment-based configuration, no hardcoded secrets, production secret injection patterns

---

## 12. Performance & Scaling

**Horizontal Scale Points**:

- `loriot-client`: Multiple instances with fanout exchange distribution, gRPC-managed dynamic subscriptions
- `sensor-processor`: CPU-bound scaling with V8Go isolate pools, configurable worker pool sizing, Redis-cached metadata
- `rmq2ts`: Multiple consumers with intelligent batch processing, workspace-aware connection pooling, TimescaleDB optimizations
- `api-gateway`: Stateless with async database pools, Redis session storage, workspace-filtered SSE scaling
- `front-end`: CDN-ready static builds with Vite 8 optimizations, lazy loading, efficient bundle splitting

**Key Performance Tunables**:

- V8Go: `SANDBOX_TIMEOUT`, `SANDBOX_MEMORY_LIMIT`, `WORKER_POOL_SIZE`, lazy isolate loading
- Database: Connection pools (`DB_MAX_OPEN_CONNS`), async operations, workspace-optimized queries
- Cache: Redis TTL settings, multi-level caching (metadata, sessions, batch processing)
- RabbitMQ: Consumer prefetch, exchange optimization, batch message handling
- Multi-tenant: Workspace-scoped indexing, efficient permission checking, audit log retention

---

## 13. Troubleshooting Quick Reference

| Symptom                   | Likely Cause                                      | Action                                                                                        |
| ------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Decoding timeouts spike   | Decoder complexity or V8Go limits too low         | Check `decoder_sandbox_timeouts_total` metrics, review decoder code, adjust `SANDBOX_TIMEOUT` |
| Cache misses high         | Redis unavailable or TTL misconfiguration         | Verify Redis connectivity, adjust cache TTL settings (`REDIS_TTL`, `SENSOR_CACHE_TTL`)        |
| gRPC retries              | Network issues or keepalive mismatches            | Check keepalive environment variables, network connectivity, service health                   |
| Slow historical queries   | Missing hypertable optimization or large datasets | Apply TimescaleDB compression, optimize time range queries, check workspace filtering         |
| SSE disconnections        | Network timeouts or workspace permission issues   | Check reverse proxy configuration, verify workspace access, monitor connection metrics        |
| Multi-tenant data leakage | Missing workspace context in queries              | Audit workspace_id filtering in all database queries, check authorization middleware          |
| Authentication failures   | JWT/cookie issues or account lockouts             | Check secret key configuration, verify cookie settings, review account lockout policies       |
| Batch processing errors   | Interval misconfiguration or buffer timeouts      | Check sensor `reporting_interval`, monitor batch cache, verify message ordering               |

**Monitoring Points**: Check service-specific metrics at `/metrics` endpoints, structured logs with workspace context, health checks at `/health`, gRPC connectivity status.

---

## 14. Roadmap (Current & Future)

**Recently Completed**:

- Multi-tenant architecture with workspace isolation and RBAC
- Enhanced V8Go security with multi-layer analysis and batch processing
- Unified database initialization system replacing separate scripts
- Front-end modernization (React 19, Vite 8, Bun runtime)
- Comprehensive audit logging and compliance features
- Advanced TimescaleDB optimizations with intelligent message processing

---

## 15. License

MIT (see project root). Replace secrets and review security controls before any production deployment.

---

## 16. At a Glance

| Area                           | Status                                              |
| ------------------------------ | --------------------------------------------------- |
| **Architecture**               | Multi-tenant with workspace isolation & RBAC        |
| **Ingestion → Decode Latency** | Comprehensive metrics with batch processing         |
| **Decoder Security**           | Multi-layer analysis (static, AST, risk scoring)    |
| **Multi-Tenancy**              | Enforced at all layers with audit trails            |
| **Authentication**             | JWT with refresh tokens, account lockout, cookies   |
| **Real-time Streaming**        | SSE with workspace filtering, connection management |
| **Persistence**                | TimescaleDB hypertables + PostgreSQL metadata       |
| **Caching**                    | Multi-level Redis (metadata, sessions, batch data)  |
| **Messaging**                  | RabbitMQ fanout with intelligent batch processing   |
| **Frontend**                   | React 19 + TypeScript, Vite 8, modern tooling       |
| **Development**                | Modern stack (Bun, uv, ruff, V8Go, async/await)     |
| **Production Ready**           | Docker Bake, health checks, graceful shutdown       |

**Technology Stack**: Go 1.25+ (V8Go, CGO), Python 3.12+ (FastAPI, uv), React 19 (TypeScript, Vite 8, Bun), TimescaleDB, PostgreSQL, Redis, RabbitMQ.

**Contributions**: Follow existing patterns and lint standards. Multi-tenant context required for all features. Keep changes observable with metrics and audit trails.
