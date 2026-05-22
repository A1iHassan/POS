import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "src/core/db/db.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./presentation/auth.controller";

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: "iugbhjo'1j;2grlbt;",
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})

export class AuthModule { }