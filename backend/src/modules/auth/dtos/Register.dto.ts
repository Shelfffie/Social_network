import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\S+$/, {
    message: 'Username must be a single word without spaces',
  })
  @IsLowercase()
  @MinLength(3)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
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
