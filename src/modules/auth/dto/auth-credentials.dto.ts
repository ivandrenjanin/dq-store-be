import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public password!: string;
}
