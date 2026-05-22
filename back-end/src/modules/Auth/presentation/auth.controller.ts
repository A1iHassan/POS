import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { AuthService } from "../auth.service";
import { NewUser } from "./dto/createUser";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Get('refresh')
    async refreshToken() {

    }

    @Post('login')
    async LogIn(@Body() payload: any, @Res() res: Response) {
        const token = await this.authService.logInUser(payload)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        return res.send({ message: 'Logged in successfully' })
    }

    @Post('signup')
    async SignUp(@Body() payload: NewUser) {
        return await this.authService.addNewUser(payload)
    }
}
