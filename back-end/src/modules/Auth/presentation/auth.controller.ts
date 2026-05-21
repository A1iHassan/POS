import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { NewUser } from "./dto/createUser";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Get('refresh')
    async refreshToken() {

    }

    @Post('login')
    async LogIn(@Body() payload: any) {

    }

    @Post('signup')
    async SignUp(@Body() payload: NewUser) {
        return await this.authService.addNewUser(payload)
    }
}
