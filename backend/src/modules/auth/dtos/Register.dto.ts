import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Field can not be empty' })
  @IsString({ message: 'Username must be string' })
  @Matches(/^\S+$/, {
    message: 'Username must be a single word without spaces',
  })
  @IsLowercase({ message: 'Username must be in lower case' })
  @MinLength(3, { message: 'Username must be 3 character at least' })
  @MaxLength(50, { message: 'Username  must be shorter than 50 characters' })
  username: string;

  @IsString({ message: 'Email must be string' })
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Display name must be in lower case' })
  @MinLength(2, {
    message: 'Name must be at least 2 characters',
  })
  @MaxLength(50, {
    message: 'Name must be shorter than 50 characters',
  })
  displayName?: string;

  @IsString({ message: 'Password must be string' })
  @MinLength(8, { message: 'Password must be at least 8 character long' })
  @MaxLength(64)
  @Matches(/^(?=.*[а-яa-zA-Z])(?=.*\d).{8,}$/, {
    message: 'Password must contain letters and numbers',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Password must contain at least one number',
  })
  password: string;
}
