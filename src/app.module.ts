import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth/auth.controller';
import { DatabaseModule } from './database/database.module';
import { AuthService } from './services/auth/auth.service';
import { DentistService } from './services/dentist/dentist.service';
import { DentistController } from './controllers/dentist/dentist.controller';
import { AppointmentController } from './controllers/appointment/appointment.controller';
import { AppointmentService } from './services/appointment/appointment.service';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [
    AppController,
    AuthController,
    DentistController,
    AppointmentController,
  ],
  providers: [AppService, AuthService, DentistService, AppointmentService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/auth/signup', method: RequestMethod.POST },
        { path: 'api/auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
