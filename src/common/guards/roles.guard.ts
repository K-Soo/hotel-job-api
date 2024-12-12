import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 데코레이터로 설정된 역할 가져오기
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('requiredRoles: ', requiredRoles);
    if (!requiredRoles) {
      return true; // 역할이 필요하지 않으면 요청 허용
    }

    // 요청에서 사용자 정보 가져오기
    const { user } = context.switchToHttp().getRequest();
    console.log('user: ', user);

    if (!user || !user.role) {
      throw new ForbiddenException('No role found for the user');
    }

    // 사용자 역할이 허용된 역할에 포함되는지 확인
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException('You do not have the required role');
    }

    return true;
  }
}
