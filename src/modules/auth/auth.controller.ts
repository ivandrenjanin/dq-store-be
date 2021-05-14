import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthIdentityResponseDto } from './dto/auth-identity-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  @ApiCreatedResponse({
    type: AuthIdentityResponseDto,
  })
  public authenticateIdentity(@Body() dto: AuthCredentialsDto) {
    return this.service.authenticateIdentity(dto);
  }
}
