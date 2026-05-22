import { Inject, Injectable, BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { JwtService } from "@nestjs/jwt";
import { hash, compare } from "bcrypt"
import { dbClient } from "src/core/db/db.constants";
import * as schema from '../../core/db/schema'
import { NewUser } from "./presentation/dto/createUser";

@Injectable()
export class AuthService {
    constructor(
        @Inject(dbClient) private readonly db: NodePgDatabase<typeof schema>,
        private readonly jwt: JwtService,
    ) { }

    async logInUser(payload: NewUser) {
        const users = await this.db.select().from(schema.users).where(eq(schema.users.name, payload.name))
        if (users.length !== 1) throw NotFoundException
        if (!await compare(payload.password, users[0].password)) throw new UnauthorizedException()
        const token = await this.jwt.signAsync({ name: payload.name })
        return token
    }

    async addNewUser(payload: NewUser) {
        const users = await this.db.select().from(schema.users).where(eq(schema.users.name, payload.name))
        if (users.length > 0) throw BadRequestException
        payload.password = await hash(payload.password, 20)
        return await this.db.insert(schema.users).values({ name: payload.name, password: payload.password }).returning({ name: schema.users.name })
    }
}