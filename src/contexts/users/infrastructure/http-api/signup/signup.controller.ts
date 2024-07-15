import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SignupHttpDto } from "./signup.http-dto";
import { Public } from "src/contexts/shared/decorators/public.decorator";
import { ReturnUser } from "src/contexts/shared/types/returnUser.type";
import { SignupUseCase } from "src/contexts/users/app/signup-use-case/signup.use-case";

@Controller('users')
export class SignUpController {
    constructor(private readonly signupUseCase: SignupUseCase) { }

    @Public()
    // Buscar solucion para las estrategias
    // @UseGuards(AuthGuard('local'))
    @Post('signup')
    async run(@Body() signupDto: SignupHttpDto): Promise<{ accessToken: string, user: ReturnUser }> {
        return await this.signupUseCase.execute(signupDto);
    }
}