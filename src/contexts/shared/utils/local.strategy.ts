import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
// import { FindOneUserUseCase } from "src/contexts/users/app/find-oneuser-use-case/find-one-user.use-case";
import { ValidateUser } from "./validate-user";
// https://medium.com/@camillef_58366/implementing-authentication-in-nestjs-using-passport-and-jwt-5a565aa521de
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        private readonly validateUser: ValidateUser
    ) {
        super({
            usernameField: 'email',
        });
    }

    async validate(passwordReceived: string, userPassword: string): Promise<any> {
        const user = this.validateUser.validatePassword(passwordReceived, userPassword);
        return user;
    }

}