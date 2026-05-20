import { Inject, Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { dbClient } from "src/core/db/db.constants";
import * as schema from '../../core/db/schema'

@Injectable()
export class AuthService {
    constructor(
        @Inject(dbClient) private readonly db: NodePgDatabase<typeof schema>
    ) { }
}