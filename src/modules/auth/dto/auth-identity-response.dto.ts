import { ApiProperty } from '@nestjs/swagger';

export class AuthIdentityResponseDto {
  @ApiProperty()
  public accessToken!: string;
}
