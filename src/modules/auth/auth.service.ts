import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EncryptionService } from '../global/encryption/encryption.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthIdentityResponseDto } from './dto/auth-identity-response.dto';
import { IdentityRepository } from './identity.repository';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IDENTITY_REPOSITORY')
    private readonly repository: IdentityRepository,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
  ) {}

  public async authenticateIdentity(
    dto: AuthCredentialsDto,
  ): Promise<AuthIdentityResponseDto> {
    const identity = await this.repository.findIdentityByEmail(
      dto.email.toLowerCase(),
    );

    console.log(identity);
    if (!identity || !identity.password) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.encryptionService.compareString(
      identity.password,
      dto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const { id } = identity;

    const payload: JwtPayload = { id };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
