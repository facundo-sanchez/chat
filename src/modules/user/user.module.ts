import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersRepository } from 'src/models/repository/users.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ...UsersRepository],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
    // throw new Error('Method not implemented.');
  }
}
