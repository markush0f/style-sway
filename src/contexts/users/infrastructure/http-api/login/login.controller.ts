import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoginUseCase } from "src/contexts/users/app/login-use-case/login.use.case";
import { LoginHttpDto } from "./login.http-dto";
import { Public } from "src/contexts/shared/decorators/public.decorator";
import { ReturnUser } from "src/contexts/shared/types/returnUser.type";

@Controller("users")
export class LoginController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Public()
  // Buscar solucion para las estrategias
  // @UseGuards(AuthGuard('local'))
  @Post("login")
  async run(@Body() loginDto: LoginHttpDto): Promise<{ accessToken: string; user: ReturnUser }> {
    return await this.loginUseCase.execute(loginDto);
  }
}
