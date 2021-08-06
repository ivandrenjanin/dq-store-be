import { IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

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
  public order: CreateOrderInnerDto[];

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  public companyClientId: number;
}
