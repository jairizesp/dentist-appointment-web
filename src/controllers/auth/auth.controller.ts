import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResult } from '../../interface/api-result.interface';
import {
  UserCredentials,
  UserInformation,
} from '../../interface/auth/auth.interface';
import { AuthService } from '../../services/auth/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: UserCredentials) {
    const user = await this.authService.validateUser(body);
    if (!user) throw new NotAcceptableException('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(
    @Body() body: UserInformation,
  ): Promise<ApiResult<Omit<UserInformation, 'password'>>> {
    return this.authService.signup(body);
  }
}
