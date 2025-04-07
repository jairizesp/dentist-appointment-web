import { Pool } from 'pg';
import { UserCredentials, UserInformation } from '../../interface/auth/auth.interface';
import * as jwt from 'jsonwebtoken';
import { ApiResult } from '../../interface/api-result.interface';
export declare class AuthService {
    private readonly pool;
    constructor(pool: Pool);
    JWT_SECRET_KEY: string | undefined;
    validateUser(credentials: UserCredentials): Promise<Omit<UserInformation, 'password'> | null>;
    login(credentials: Omit<UserInformation, 'password'>): Promise<ApiResult<Omit<UserInformation, 'password'>>>;
    verifyToken(token: string): Promise<string | jwt.JwtPayload | null>;
    validateUserIfExists(email: string): Promise<boolean>;
    signup(userInformation: UserInformation): Promise<ApiResult<Omit<UserInformation, 'password'>>>;
}
