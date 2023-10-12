/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpException } from '@nestjs/common';
import { Body, Get, Post, Req, Res } from '@nestjs/common/decorators';
import { RegisterDto } from './dto/register-auth.dto';
import { Response, Request } from 'express'
import { HttpStatus } from '@nestjs/common/enums';
import { LoginDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { Users } from 'src/models';
import { ERRORS_MESSAGE } from 'src/constants/errros';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Res() res: Response, @Body() user: RegisterDto): Promise<Response<Users>> {
    try {
      const response = await this.authService.register(user)

      if (response.status === HttpStatus.CONFLICT)
        return res.status(HttpStatus.BAD_REQUEST).json({ message: response.message })


      return res.status(HttpStatus.OK).json({ ok: true })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: ERRORS_MESSAGE.SERVER_ERROR });
    }
  }

  @Post('login')
  async login(@Res() res: Response, @Req() req: Request, @Body() user: LoginDto): Promise<Response<Users>> {
    try {
      const { token } = req.signedCookies
      if (token) {
        const result = this.authService.validate(token)
        if (result)
          return res.status(HttpStatus.OK).json({ session: result, token })
      }
      const response = await this.authService.login(user);

      if (response.status === HttpStatus.NOT_FOUND)
        return res.status(HttpStatus.NOT_FOUND).json({ message: response.message })

      res.cookie('token', response.token, response.options)
      return res.status(HttpStatus.OK).json({ session: response })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: ERRORS_MESSAGE.SERVER_ERROR });
    }
  }
}
