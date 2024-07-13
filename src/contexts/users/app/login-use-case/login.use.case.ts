import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { LoginUserDto } from "./login.dto";
import { PrimitiveUser, User } from "../../domain/user.entity";
import { UserNotFoundExceptionByEmail } from "../../domain/exceptions/user-not-found.exception";
import { ValidateUser } from "src/contexts/shared/utils/validate-user";
import { AccessTokenPayload } from "src/contexts/shared/types/accessTokenPayload.type";
import { UserUnauthorizedException } from "../../domain/exceptions/user-unauthorized.exception";


@Injectable()
export class LoginUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly validateUser: ValidateUser
    ) { }

    async execute(loginUserDto: LoginUserDto): Promise<{ accessToken: AccessTokenPayload, user: PrimitiveUser }> {
        console.log('enter here')
        const user: User = await this.userRepository.findOneByEmail(loginUserDto.email);
        if (!user) {
            throw new UserNotFoundExceptionByEmail(loginUserDto.email);
        }
        const isValid = await this.validateUser.validatePassword(loginUserDto.password, user.toValue().password);
        if (!isValid) {
            console.log('here');
            throw new UserUnauthorizedException();
        }
        return {
            accessToken: { id: user.toValue().id },
            user: user.toValue()
        };

    }
}