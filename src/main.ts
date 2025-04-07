import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:
      process.env.CLIENT_URL! ??
      'https://dentist-appointment-app-rdcy.vercel.app',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
