import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 20,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsEmail()
  public email!: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 20,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public password!: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 20,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  public firstName!: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 20,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  public lastName!: string;
}
