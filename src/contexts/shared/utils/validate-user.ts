import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/contexts/users/domain/user.repository";
import * as bcrypt from 'bcrypt';
@Injectable()
export class ValidateUser {

    constructor() { }
    async validatePassword(passwordReceived: string, userPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(userPassword, passwordReceived);
        console.log('yess')
        if (!isMatch) {
            return false;
        }
        return true;
    }
}