import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatsRepository } from 'src/models/repository/chats.repository';
import { MessagesRepository } from 'src/models/repository/messages.repository';

@Module({
  providers: [ChatService, ...ChatsRepository, ...MessagesRepository],
  controllers: [ChatController],
})
export class ChatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
    // throw new Error('Method not implemented.');
  }
}
