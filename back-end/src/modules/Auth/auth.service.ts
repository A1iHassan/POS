import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { dbClient } from "src/core/db/db.constants";
import * as schema from '../../core/db/schema'
import { NewUser } from "./presentation/dto/createUser";
import { eq } from "drizzle-orm";

@Injectable()
export class AuthService {
    constructor(
        @Inject(dbClient) private readonly db: NodePgDatabase<typeof schema>
    ) { }

    async addNewUser(payload: NewUser) {
        const users = await this.db.select().from(schema.users).where(eq(schema.users.name, payload.name))
        if (users.length > 0) throw BadRequestException
        return await this.db.insert(schema.users).values(payload).returning({ name: schema.users.name })
    }
}