import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/core/db/db.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./presentation/auth.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})

export class AuthModule { }