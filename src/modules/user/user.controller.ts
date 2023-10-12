/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Param,
  Req,
  Res,
  HttpStatus,
  ParseIntPipe,
  Body,
  UseGuards
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ERRORS_MESSAGE, ERRORS_USER } from 'src/constants/errros';
import { Public } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/roles.decorator';
// import { RolesGuard } from 'src/guards/role.guard';
import { Users } from 'src/models/index';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Roles(['admin'])
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response<Users>> {
    try {
      console.log(req.user)
      console.log(req.cookies);
      const response = await this.userService.getUsers();

      if (!response)
        return res.status(HttpStatus.NOT_FOUND).json({ msg: ERRORS_USER.NOT_FOUND });

      return res.status(HttpStatus.OK).json({ users: response });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: ERRORS_MESSAGE.SERVER_ERROR });
    }
  }

  @Roles(['admin'])
  @Get('/:id')
  async getUser(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<Users>> {
    try {
      const user = await this.userService.getUser(id);

      if (!user)
        return res.status(HttpStatus.NOT_FOUND).json({ msg: ERRORS_USER.NOT_FOUND });

      return res.status(HttpStatus.OK).json({ user });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: ERRORS_MESSAGE.SERVER_ERROR });
    }
  }

  @Roles(['admin'])
  @Post()
  async createUser(
    @Res() res: Response,
    @Req() req: Request,
    @Body() user: UserDto,
  ): Promise<Response<Users>> {
    try {
      const newUser = await this.userService.createUser(user);
      if (newUser) {
        return res.status(HttpStatus.CREATED).json({ newUser });
      }
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ msg: ERRORS_USER.CREATED });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: ERRORS_MESSAGE.SERVER_ERROR });
    }
  }

  @Roles(['admin'])
  @Put('/:id')
  async updateUser(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserDto,
  ): Promise<Response<Users>> {
    try {
      const updateUser = await this.userService.updateUser(id, user);
      if (updateUser) {
        return res.status(HttpStatus.OK).json({ user: updateUser });
      }

      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ msg: ERRORS_USER.UPDATE });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: ERRORS_MESSAGE.SERVER_ERROR });
    }
  }

  @Roles(['admin'])
  @Delete('/:id')
  async deleteUser(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<Users>> {
    try {
      const user = await this.userService.deleteUser(id);
      if (user) {
        return res.status(HttpStatus.OK).json({ user });
      }

      return res.status(HttpStatus.NOT_FOUND).json({ id });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: ERRORS_MESSAGE.SERVER_ERROR });
    }
  }
}
