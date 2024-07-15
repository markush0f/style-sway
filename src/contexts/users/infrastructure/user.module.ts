import { Module, Provider } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";
import { InMemoryUserRepository } from "./repositories/in-memory.user.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { FindOneUserUseCase } from "../app/find-one-user-use-case/find-one-user.use-case";
import { LocalStrategy } from "src/contexts/shared/utils/local.strategy";
import { JwtStrategy } from "src/contexts/shared/utils/jwtStrategy";
import { ValidateUser } from "src/contexts/shared/utils/validate-user";
import { LoginController } from "./http-api/login/login.controller";
import { LoginUseCase } from "../app/login-use-case/login.use.case";
import { JWT_CONSTANT } from "src/contexts/shared/secret/jwt.constant";
import { JwtHelper } from "src/contexts/shared/utils/jwt";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: JWT_CONSTANT,
                signOptions: { expiresIn: '1d' }
            })
        }),
    ],
    controllers: [LoginController],
    providers: [
        FindOneUserUseCase,
        LocalStrategy,
        JwtStrategy, 
        ValidateUser,
        InMemoryUserRepository,
        LoginUseCase,
        JwtHelper,
        {
            provide: UserRepository,
            useExisting: InMemoryUserRepository
        }
    ],
    exports: [FindOneUserUseCase, JwtModule],
})
export class UserModule { }