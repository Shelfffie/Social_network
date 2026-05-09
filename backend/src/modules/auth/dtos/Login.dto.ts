import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class LoginDto {
  @ValidateIf((o) => !o.email)
  @IsNotEmpty({ message: 'Email or username is required' })
  @IsString()
  @Matches(/^\S+$/, {
    message: 'Username must be a single word without spaces',
  })
  @MinLength(3)
  username?: string;

  @ValidateIf((o) => !o.name)
  @IsEmail()
  @IsNotEmpty({ message: 'Email or username is required' })
  @IsString()
  email?: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[а-яa-zA-Z])(?=.*\d).{8,}$/)
  password: string;
}
