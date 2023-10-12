/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get } from '@nestjs/common';
import { Model } from 'sequelize';
import { AppService } from './app.service';
import { Chats } from './models/schemas/chat.model';
import { ChatMessages } from './models/schemas/chatMessages.model';
// import { Chat } from './models/chat.model';
import { ChatTypes } from './models/schemas/chatTypes.model';
import { Messages } from './models/schemas/message.model';
import { Users } from './models/schemas/user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
