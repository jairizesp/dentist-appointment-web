import { ApiResult } from 'src/interface/api-result.interface';
import { UserCredentials, UserInformation } from 'src/interface/auth/auth.interface';
import { AuthService } from 'src/services/auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: UserCredentials): Promise<ApiResult<Omit<UserInformation, "password">>>;
    signup(body: UserInformation): Promise<ApiResult<Omit<UserInformation, 'password'>>>;
}
