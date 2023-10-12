import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './modules/chat/chat.module';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/message/message.module';
import { DatabaseModule } from './config/database.module';
import { AuthModule } from './modules/auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './guards/role.guard';

@Module({
  providers: [AppService],
  imports: [DatabaseModule, ChatModule, UserModule, MessageModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {
}
