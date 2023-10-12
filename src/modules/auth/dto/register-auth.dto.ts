import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { LoginDto } from "./login-auth.dto";

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(150)
  surname: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  phone: number;

  active: boolean;


}