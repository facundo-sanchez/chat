/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwt: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.get(Roles, context.getHandler());
      if (!roles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const token = request.headers['authorization'];
      // const user = request.user;

      if (!token)
        return false;

      const decodedToken = this.jwt.verify(token);
      // El token es válido, puedes trabajar con el token decodificado aquí
      request.user = decodedToken;
      return true;

    } catch (error) {
      return false;
    }

  }
}
