import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const AllowedRoles = (...roles: string[]): CustomDecorator<string> => {
  return SetMetadata('roles', roles);
};
