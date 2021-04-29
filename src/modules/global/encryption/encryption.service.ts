import * as bcrypt from 'bcryptjs';

import { Injectable } from '@nestjs/common';

import { ConfigOption } from '../../../enums/config-option.enum';
import { ConfigService } from '../config/config.service';

@Injectable()
export class EncryptionService {
  constructor(private readonly config: ConfigService) {}

  public async hashString(text: string): Promise<string> {
    const saltRounds = this.config.getOrDefault(
      ConfigOption.ENCRYPTION_SALT_ROUNDS,
      '10',
    );

    const salt = await bcrypt.genSalt(parseInt(saltRounds, 10));
    const hash = await bcrypt.hash(text, salt);

    return hash;
  }

  public async compareString(hash: string, text: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
