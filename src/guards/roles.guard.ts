import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.identity;

    const hasRole = () =>
      user.roles.some((userRole) => roles.includes(userRole.role.name));

    const isAllowed = user && user.roles.length && hasRole();

    if (!isAllowed) {
      throw new ForbiddenException();
    }

    return true;
  }
}
