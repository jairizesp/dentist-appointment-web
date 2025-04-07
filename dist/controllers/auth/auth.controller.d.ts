import { ApiResult } from '../../interface/api-result.interface';
import { UserCredentials, UserInformation } from '../../interface/auth/auth.interface';
import { AuthService } from '../../services/auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: UserCredentials): Promise<ApiResult<Omit<UserInformation, "password">>>;
    signup(body: UserInformation): Promise<ApiResult<Omit<UserInformation, 'password'>>>;
}
