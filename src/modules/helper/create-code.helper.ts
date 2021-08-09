import * as crypto from 'crypto';

export const createCode = (): string => {
  const code = crypto.randomBytes(4).toString('hex');
  return code;
};
