import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://dentist-appointment-app-rdcy.vercel.app',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
