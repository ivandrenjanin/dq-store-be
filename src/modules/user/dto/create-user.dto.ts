import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IdentityPermissionRole } from '../../../enums/identity-role.enum';

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

  @ApiProperty({
    minLength: 1,
    maxLength: 20,
    required: true,
    enum: [
      IdentityPermissionRole.ADMIN,
      IdentityPermissionRole.COMPANY_ADMIN,
      IdentityPermissionRole.COMPANY_MEMBER,
    ],
    examples: [
      IdentityPermissionRole.ADMIN,
      IdentityPermissionRole.COMPANY_ADMIN,
      IdentityPermissionRole.COMPANY_MEMBER,
    ],
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @IsIn([
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  ])
  public role!: IdentityPermissionRole;
}
