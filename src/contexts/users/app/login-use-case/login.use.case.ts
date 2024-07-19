import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { LoginUserDto } from "./login.dto";
import { User } from "../../domain/user.model";
import { ValidateUser } from "src/contexts/shared/utils/validate-user";
import { UserUnauthorizedException } from "../../domain/exceptions/user-unauthorized.exception";
import { UserNotFoundExceptionByEmail } from "../../domain/exceptions/user-not-found.exception";
import { ReturnUser } from "src/contexts/shared/types/returnUser.type";
import { JwtHelper } from "src/contexts/shared/utils/jwt";

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly validateUser: ValidateUser,
    private readonly jwtHelper: JwtHelper,
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<{ accessToken: string; user: ReturnUser }> {
    try {
      console.log("enter here");
      console.log(loginUserDto);
      const user: User = await this.userRepository.findOneByEmail(loginUserDto.email);
      if (!user) {
        throw new UserNotFoundExceptionByEmail(loginUserDto.email);
      }
      console.log(user);
      const isValid = await this.validateUser.validatePassword(loginUserDto.password, user.toValue().password.toString());
      console.log(isValid);
      if (!isValid) {
        console.log("here");
        throw new UserUnauthorizedException();
      }
      const { password, ...userResult } = user.toValue();
      const token = await this.jwtHelper.generateToken({
        userId: user.toValue().id,
      });
      return {
        accessToken: token,
        user: userResult,
      };
    } catch (error) {
      if (error instanceof UserNotFoundExceptionByEmail) {
        throw new UserNotFoundExceptionByEmail(error.email);
      }
      if (error instanceof UserUnauthorizedException) {
        throw new UserUnauthorizedException();
      }
      throw error;
    }
  }
}
