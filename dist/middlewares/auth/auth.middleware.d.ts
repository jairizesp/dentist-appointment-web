import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../services/auth/auth.service';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly authService;
    constructor(authService: AuthService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
