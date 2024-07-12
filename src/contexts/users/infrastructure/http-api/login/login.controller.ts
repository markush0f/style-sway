import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoginUseCase } from "src/contexts/users/app/login-use-case/login.use.case";
import {  PrimitiveUser, User } from "src/contexts/users/domain/user.entity";
import { LoginDto } from "./login.http-dto";
import { AccessTokenPayload } from "src/contexts/shared/types/accessTokenPayload.type";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class LoginController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async run(@Body() loginDto: LoginDto): Promise<{ accessToken: AccessTokenPayload, user: PrimitiveUser }> {
        return await this.loginUseCase.execute(loginDto);
    }
}