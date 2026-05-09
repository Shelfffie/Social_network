import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { startWith } from 'rxjs';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5, { message: 'You can add 5 tags only' })
  tags?: string[];
}
