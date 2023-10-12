import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
    // throw new Error('Method not implemented.');
  }
}
