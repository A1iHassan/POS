import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { dbClient } from "./db.constants";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema"

@Module({
    imports: [],
    providers: [
        {
            provide: dbClient,
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const connectionString = config.get<string>('DATABASE_URL');
                const pool = new Pool({ connectionString })
                return drizzle(pool, { schema })
            }
        }
    ],
    exports: [dbClient],
})
export class DatabaseModule { }