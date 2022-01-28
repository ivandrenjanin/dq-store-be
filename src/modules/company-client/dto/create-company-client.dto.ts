import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyClientDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  public postalCode?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  public streetNumber?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  public street?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  public city?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  public taxIdNumber?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  public companyNumber?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  public bankName?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  public bankAccountNumber?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  public phoneFaxNumber?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  public phoneMobileNumber?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  public email?: string;
}
