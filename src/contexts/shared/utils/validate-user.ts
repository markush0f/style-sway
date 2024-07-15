import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/contexts/users/domain/user.repository";
import * as bcrypt from 'bcrypt';
@Injectable()
export class ValidateUser {

    constructor() { }
    async validatePassword(passwordReceived: string, userPassword: string): Promise<boolean> {
        console.log(passwordReceived, userPassword)
        const isMatch = await bcrypt.compare(passwordReceived, userPassword);

        if (!isMatch) {
            return false;
        }
        console.log('yess')
        return true;
    }
}