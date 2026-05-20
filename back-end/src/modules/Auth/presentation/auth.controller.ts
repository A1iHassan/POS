import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Controller('api/v1/auth')
export class AuthController {
    @Get('refresh')
    async refreshToken() {

    }

    @Post('login')
    async LogIn(@Body() payload: any) {

    }

    @Post('signup')
    async SignUp(@Body() payload: any) {

    }
}