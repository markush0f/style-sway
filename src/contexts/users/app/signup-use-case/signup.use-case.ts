import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { PrimitiveUser, User } from "../../domain/user.entity";
import { SignupDto } from "./signup-dto";
import { JwtHelper } from "src/contexts/shared/utils/jwt";
import { UserAlreadyExistsException } from "../../domain/exceptions/user-already-exists.exception";
import { BcryptHelper } from "src/contexts/shared/utils/bcrypt.hash";


@Injectable()
export class SignupUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtHelper: JwtHelper,
        private readonly bcryptHelper: BcryptHelper
    ) { }

    async execute(signupDto: SignupDto): Promise<{ user: PrimitiveUser, accessToken: string }> {
        try {
            const userFounded = await this.userRepository.findOneByEmail(signupDto.email);
            if (userFounded) {
                throw new UserAlreadyExistsException(userFounded.toValue().id);
            }
            signupDto.password = await this.bcryptHelper.hashPassword(signupDto.password);
            // Change to User Entity
            const userCreated: User = await this.userRepository.signUp(signupDto);
            console.log(userCreated);
            const token = await this.jwtHelper.generateToken({ id: userCreated.toValue().id });
            return {
                user: userCreated.toValue(),
                accessToken: token
            }
        } catch (error) {
            if (error instanceof UserAlreadyExistsException) {
                throw new UserAlreadyExistsException(error.id);
            }
        }

    }
}