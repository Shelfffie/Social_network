import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
