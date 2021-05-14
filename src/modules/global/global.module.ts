import {
  ClassSerializerInterceptor,
  Global,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalExceptionFilter } from '../../filters/global-exception.filter';

import { ConfigService } from './config/config.service';
import { PostgreSQLService } from './config/postgresql.service';
import { EncryptionService } from './encryption/encryption.service';
import { GlobalController } from './global.controller';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgreSQLService,
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService('.env', {}),
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
        skipNullProperties: false,
        skipUndefinedProperties: false,
        validationError: {
          target: true /** Indicates if target should be exposed in ValidationError. */,
          value: true /** Indicates if validated value should be exposed in ValidationError. */,
        },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    EncryptionService,
  ],
  controllers: [GlobalController],
  exports: [ConfigService, EncryptionService],
})
export class GlobalModule {}
