import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDetailsDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public primePrice!: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public quantity!: number;
}
