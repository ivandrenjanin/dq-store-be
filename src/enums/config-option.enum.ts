export enum ConfigOption {
  // SYSTEM
  NODE_ENV = 'NODE_ENV',

  // TYPEORM
  TYPEORM_URL = 'TYPEORM_URL',

  // ENCRYPTION
  ENCRYPTION_SALT_ROUNDS = 'ENCRYPTION_SALT_ROUNDS',

  // Pino Logger
  PINO_LOG_LEVEL = 'PINO_LOG_LEVEL',

  // Bucket
  BUCKET_ACCESS_KEY = 'BUCKET_ACCESS_KEY',
  BUCKET_SECRET_KEY = 'BUCKET_SECRET_KEY',
  BUCKET_ENDPOINT = 'BUCKET_ENDPOINT',
  BUCKET_REGION = 'BUCKET_REGION',
  BUCKET_NAME = 'BUCKET_NAME',

  // JWT
  JWT_SECRET_KEY = 'JWT_SECRET_KEY',
  JWT_EXPIRATION_TIME = 'JWT_EXPIRATION_TIME',

  // CHROMIUM
  CHROMIUM_EXE_PATH = 'CHROMIUM_EXE_PATH',
}
