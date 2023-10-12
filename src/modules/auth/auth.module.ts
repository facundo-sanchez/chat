import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from 'src/models/repository/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt'
import { JWTStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/role.guard';

@Module({
  providers: [AuthService, ...UsersRepository, JWTStrategy, { provide: APP_GUARD, useClass: RolesGuard }],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ]
})
export class AuthModule { }
