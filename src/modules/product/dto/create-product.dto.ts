import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public name!: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public code!: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public sellingPrice!: number;
}
