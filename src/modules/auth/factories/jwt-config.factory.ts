import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { ConfigOption } from '../../../enums/config-option.enum';
import { ConfigService } from '../../global/config/config.service';

@Injectable()
export class JwtConfigFactory implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.getOrThrow(ConfigOption.JWT_SECRET_KEY),
      signOptions: {
        expiresIn: this.config.getOrThrow(ConfigOption.JWT_EXPIRATION_TIME),
      },
    };
  }
}
