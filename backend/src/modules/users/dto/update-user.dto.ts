import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({
    message: 'Username cannot be empty',
  })
  @IsString({
    message: 'Username must be a string',
  })
  @MinLength(2, {
    message: 'Username must be at least 2 characters',
  })
  @MaxLength(50, {
    message: 'Username must be shorter than 50 characters',
  })
  username?: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Name cannot be empty',
  })
  @IsString({
    message: 'Name must be a string',
  })
  @MinLength(2, {
    message: 'Name must be at least 2 characters',
  })
  @MaxLength(50, {
    message: 'Name must be shorter than 50 characters',
  })
  displayName?: string;

  @IsOptional()
  @IsString({
    message: 'Bio must be a string',
  })
  @MaxLength(200, {
    message: 'Name must be shorter than 200 characters',
  })
  bio?: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Email cannot be empty',
  })
  @IsEmail()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters',
  })
  @MinLength(64)
  @Matches(/^(?=.*[а-яa-zA-Z])(?=.*\d).{8,}$/)
  password?: string;

  //change in future, for now is string
  @IsOptional()
  @IsString()
  iconURL?: string;
}
