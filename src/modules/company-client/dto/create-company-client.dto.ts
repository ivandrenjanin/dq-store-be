import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyClientDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public postalCode?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public streetNumber?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public street?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public city?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public taxIdNumber?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public companyNumber?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public bankName?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public bankAccountNumber?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public phoneFaxNumber?: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
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
  public email?: string;
}
