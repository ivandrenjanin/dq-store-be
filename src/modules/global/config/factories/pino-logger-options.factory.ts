import { Params } from 'nestjs-pino';

import { ConfigOption } from '../../../../enums/config-option.enum';
import { ConfigService } from '../config.service';

export const pinoLoggerOptionsFactory = (
  config: Pick<ConfigService, 'getOrDefault'>,
): Params => ({
  pinoHttp: {
    level: config.getOrDefault(ConfigOption.PINO_LOG_LEVEL, 'debug'),
    safe: true,
    prettyPrint:
      config.getOrDefault(ConfigOption.NODE_ENV, 'development') !==
      'production',
  },
});
