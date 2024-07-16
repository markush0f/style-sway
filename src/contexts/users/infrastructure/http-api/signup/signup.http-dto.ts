import { IsEmail, IsString } from "class-validator";

export class SignupHttpDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  birth: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
