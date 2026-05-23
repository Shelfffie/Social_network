import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email or username is required' })
  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(1)
  password: string;
}
