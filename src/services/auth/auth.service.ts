import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Pool } from 'pg';
import {
  UserCredentials,
  UserInformation,
} from 'src/interface/auth/auth.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ApiResult } from 'src/interface/api-result.interface';

@Injectable()
export class AuthService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  async validateUser(
    credentials: UserCredentials,
  ): Promise<Omit<UserInformation, 'password'> | null> {
    if (!credentials.email || !credentials.password) {
      throw new NotAcceptableException('Empty values not acceptable.');
    }

    if (credentials.password.length < 6) {
      throw new NotAcceptableException(
        'Password must be at least 6 or more characters.',
      );
    }

    const res = await this.pool.query('SELECT * FROM users WHERE email = $1', [
      credentials.email,
    ]);
    const user = res.rows[0];

    if (!user) {
      throw new NotAcceptableException('Invalid credentials');
    }

    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(
    credentials: Omit<UserInformation, 'password'>,
  ): Promise<ApiResult<Omit<UserInformation, 'password'>>> {
    const payload = { email: credentials.email, sub: credentials.id };
    return {
      access_token: jwt.sign(payload, this.JWT_SECRET_KEY!, {
        expiresIn: '1h',
      }),
      data: credentials,
      response: {
        message: 'Logged in successfully',
        status_code: HttpStatus.OK,
      },
    };
  }

  async verifyToken(token: string) {
    try {
      return jwt.verify(token, this.JWT_SECRET_KEY!);
    } catch (err) {
      return null;
    }
  }

  async validateUserIfExists(email: string): Promise<boolean> {
    const res = await this.pool.query(
      'SELECT id, email FROM users WHERE email = $1',
      [email],
    );

    return res.rows.length > 0;
  }

  async signup(
    userInformation: UserInformation,
  ): Promise<ApiResult<Omit<UserInformation, 'password'>>> {
    try {
      const isUserExists = await this.validateUserIfExists(
        userInformation.email,
      );

      if (isUserExists) {
        throw new ConflictException('Email already exist.');
      }

      if (userInformation.password.length < 6) {
        throw new NotAcceptableException(
          'Password must be at least 6 or more characters.',
        );
      }

      const res = await this.pool.query(
        'INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *',
        [
          userInformation.first_name,
          userInformation.last_name,
          userInformation.email,
          await bcrypt.hash(userInformation.password, 10),
        ],
      );

      const user = res.rows[0];

      const { password, ...result } = user;

      return {
        data: result,
        response: {
          message: 'Registered successfully!',
          status_code: HttpStatus.OK,
        },
      };
    } catch (error) {
      return error;
    }
  }
}
