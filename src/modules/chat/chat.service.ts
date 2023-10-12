/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { sequelize } from 'src/config/database';
import { Chats, Messages } from 'src/models/index';
import { ChatDto } from './chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @Inject('CHATS_REPOSITORY') private readonly chatsModel: typeof Chats,
    @Inject('MESSAGE_REPOSITORY')
    private readonly messageModel: typeof Messages,
  ) { }

  async getChats(where: WhereOptions<Chats>): Promise<Chats[]> {
    try {
      const chats = await this.chatsModel.findAll({
        where,
        include: {
          model: this.messageModel,
        },
      });
      return chats;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getChat(id: number, idUser: number): Promise<Chats> {
    try {
      const chats = await this.chatsModel.findByPk(id);
      return chats;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createChat(chat: ChatDto): Promise<Chats> {
    const transaction = await sequelize.transaction();
    try {
      const chats = new this.chatsModel(chat);
      await chats.save({ transaction });
      await transaction.commit();
      return chats;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error.message);
    }
  }

  async updateChat(id: number, chat: ChatDto): Promise<ChatDto> {
    const transaction = await sequelize.transaction();
    try {
      const result = await this.chatsModel.update(chat, {
        where: { id },
        transaction,
      });
      if (result[0]) {
        await transaction.commit();
        return chat;
      }
      await transaction.rollback();
      return null;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error.message);
    }
  }

  async deleteChat(id: number): Promise<Chats> {
    const transaction = await sequelize.transaction();
    try {
      const chats = await this.chatsModel.findByPk(id);

      if (chats) {
        await chats.destroy({ transaction });
        await transaction.commit();
        return chats;
      }

      return null;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error.message);
    }
  }
}
