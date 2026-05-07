import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[а-яa-zA-Z])(?=.*\d).{8,}$/)
  password?: string;

  @IsOptional()
  @IsString()
  iconURL?: string;
}
