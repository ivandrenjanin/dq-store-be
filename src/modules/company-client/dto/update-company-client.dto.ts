import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCompanyClientDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public name?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public postalCode?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public streetNumber?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public street?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public city?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public taxIdNumber?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public companyNumber?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public bankName?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public bankAccountNumber?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public phoneFaxNumber?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public phoneMobileNumber?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(1)
  @MaxLength(100)
  public email?: string;
}
