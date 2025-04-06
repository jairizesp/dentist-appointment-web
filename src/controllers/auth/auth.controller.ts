import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResult } from 'src/interface/api-result.interface';
import {
  UserCredentials,
  UserInformation,
} from 'src/interface/auth/auth.interface';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: UserCredentials) {
    const user = await this.authService.validateUser(body);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(
    @Body() body: UserInformation,
  ): Promise<ApiResult<Omit<UserInformation, 'password'>>> {
    return this.authService.signup(body);
  }
}
