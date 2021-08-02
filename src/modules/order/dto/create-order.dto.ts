import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderInnerDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  public productId: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    type: [CreateOrderInnerDto],
  })
  @IsArray()
  // @ValidateNested({ each: true })
  public order: CreateOrderInnerDto[];
}
