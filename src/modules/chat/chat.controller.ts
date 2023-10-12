/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpStatus, ParseIntPipe } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { ERRORS_CHATS, ERRORS_MESSAGE } from 'src/constants/errros';
import { Chats } from 'src/models/index';
import { ChatDto } from './chat.dto';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatsService: ChatService) { }

  // get chat por user id
  // validar la sesion del usuario si coincide el id
  // @Get('/:userId')
  @Get()
  async getChats(
    @Res() res: Response,
    @Query() params?: any,
  ): Promise<Response<Chats[]>> {
    const { name, chatTypeId } = params;

    const where: WhereOptions<Chats> = {};
    if (chatTypeId) {
      where.chatTypeId = chatTypeId;
    }
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }

    const chats = await this.chatsService.getChats(where);
    if (chats.length === 0)
      return res.status(HttpStatus.NOT_FOUND).json({ chats });

    return res.status(HttpStatus.OK).json(chats);
  }

  @Get('/user/:userId/chat/:id')
  async getChat(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Response<Chats[]>> {
    try {
      const chat = await this.chatsService.getChat(id, userId);
      if (chat) {
        return res.status(HttpStatus.OK).json({ chat });
      }
      return res.status(404).json({ msg: ERRORS_CHATS.NOT_FOUND, chat });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: ERRORS_MESSAGE.SERVER_ERROR });
    }
  }

  @Put('/:id')
  async updateChat(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() chat: ChatDto,
  ): Promise<Response<Chats[]>> {
    try {
      const updateChat = await this.chatsService.updateChat(id, chat);
      if (updateChat) {
        return res.status(HttpStatus.CREATED).json(updateChat);
      }
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ msg: ERRORS_CHATS.UPDATE });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: ERRORS_MESSAGE.SERVER_ERROR });
    }
  }

  @Post()
  async createChat(
    @Res() res: Response,
    @Req() req: Request,
    @Body() chat: ChatDto,
  ): Promise<Response<Chats[]>> {
    try {
      const newChat = await this.chatsService.createChat(chat);

      if (newChat) {
        return res.status(HttpStatus.CREATED).json({ newChat });
      }
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ msg: ERRORS_CHATS.CREATED });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: ERRORS_MESSAGE.SERVER_ERROR });
    }
  }

  @Delete('/:id')
  async deleteChat(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<Chats[]>> {
    try {
      const chat = await this.chatsService.deleteChat(id);
      if (chat) {
        return res.status(HttpStatus.OK).json({ chat });
      }

      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ msg: ERRORS_CHATS.REMOVED });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: ERRORS_MESSAGE.SERVER_ERROR });
    }
  }
}
