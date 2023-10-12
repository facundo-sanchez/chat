import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { SECRET_COOKIE } from './constants/jwt';

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));


  // cookies
  app.use(cookieParser(SECRET_COOKIE.secret))

  // sesion
  await app.listen(8989);
}
bootstrap();
