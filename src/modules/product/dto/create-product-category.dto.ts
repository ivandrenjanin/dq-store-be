import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductCategory {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  public categoryId: number;
}
