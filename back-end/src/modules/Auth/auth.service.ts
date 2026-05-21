import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { hash } from "bcrypt"
import { dbClient } from "src/core/db/db.constants";
import * as schema from '../../core/db/schema'
import { NewUser } from "./presentation/dto/createUser";

@Injectable()
export class AuthService {
    constructor(
        @Inject(dbClient) private readonly db: NodePgDatabase<typeof schema>
    ) { }

    async addNewUser(payload: NewUser) {
        const users = await this.db.select().from(schema.users).where(eq(schema.users.name, payload.name))
        if (users.length > 0) throw BadRequestException
        payload.password = hash(payload.password, 20)
        return await this.db.insert(schema.users).values(payload).returning({ name: schema.users.name })
    }
}