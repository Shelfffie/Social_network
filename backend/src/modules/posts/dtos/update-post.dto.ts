import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  content?: string;

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
