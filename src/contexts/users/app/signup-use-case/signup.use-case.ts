import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { PrimitiveUser, User } from "../../domain/user.entity";
import { SignupDto } from "./signup-dto";
import { JwtHelper } from "src/contexts/shared/utils/jwt";


@Injectable()
export class SignupUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtHelper: JwtHelper
    ) { }

    async execute(signupDto: SignupDto): Promise<{ user: PrimitiveUser, accessToken: string }> {
        try {
            const userCreated: User = await this.userRepository.signUp(signupDto);
            return {
                user: userCreated.toValue(),
                accessToken: 'token'
            }
        } catch (error) {

        }

    }
}