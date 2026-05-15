import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { dbClient } from "./db.constants";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema"

@Module({
    imports: [],
    exports: [dbClient],
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
})
export class DatabaseModule { }