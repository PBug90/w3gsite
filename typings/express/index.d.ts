declare namespace Express {
    export interface Request {

    }
    export interface User{
        displayName: string;
        login: string;
        provider: string;
    }
}
