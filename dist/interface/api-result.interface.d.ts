export interface ApiResult<T> {
    access_token?: string;
    data: T;
    response: Response;
}
interface Response {
    message: string;
    status_code: number;
}
export {};
