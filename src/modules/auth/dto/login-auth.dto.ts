import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(255)
  email: string;

  @MinLength(6)
  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}