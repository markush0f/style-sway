import { IsEmail, IsString } from "class-validator";

export class SignupDto {
  name: string;

  surname: string;

  birth: string;

  email: string;

  password: string;
}
