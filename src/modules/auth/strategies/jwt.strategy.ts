import { ExtractJwt, Strategy } from 'passport-jwt';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { User } from '../../../entities/user.entity';
import { ConfigOption } from '../../../enums/config-option.enum';
import { ConfigService } from '../../global/config/config.service';
import { IdentityRepository } from '../identity.repository';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('IDENTITY_REPOSITORY')
    private readonly repository: IdentityRepository,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow(ConfigOption.JWT_SECRET_KEY),
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const identity: User = await this.repository.findIdentityById(payload);
    if (!identity) {
      throw new UnauthorizedException();
    }

    return identity;
  }
}
