import { IsString } from "class-validator";

export class NewUser {
    @IsString()
    name: string

    @IsString()
    password: string
}