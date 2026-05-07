import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[а-яa-zA-Z])(?=.*\d).{8,}$/, {
    message: 'Password must contain letters and numbers',
  })
  password: string;
}
