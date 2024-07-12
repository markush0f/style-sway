import { IsEmail, IsString } from "class-validator";
import { UUID } from "crypto";

export class LoginUserDto {

    @IsEmail()
    email: string;
    
    @IsString()
    password: string;
}