import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsIn,
} from 'class-validator';
import { UnitOfMessure } from '../../../enums/unit-of-messure.enum';

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
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public sellingPrice!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public primePrice!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public taxRate!: number;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsIn([
    UnitOfMessure.CENTIMETRE,
    UnitOfMessure.EACH,
    UnitOfMessure.GRAM,
    UnitOfMessure.KILOGRAM,
    UnitOfMessure.LITRE,
    UnitOfMessure.METRE,
  ])
  @MinLength(1)
  @MaxLength(100)
  public unitOfMessure: UnitOfMessure;
}
