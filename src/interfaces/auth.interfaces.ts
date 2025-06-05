import { User, UserResponse } from "./users.interface";

export interface UserLogin {
    email: string;
    password: string;
}


export interface LoginResponse {
    token: string;
    user: UserResponse;
}

export interface TokenJwt {
    userId: string;
    iat: number;
    exp: number;
    id: string;
}


export interface AuthRepository {
    login({ email, password }: UserLogin): Promise<User | null>;
    loginAdmin({ email, password }: UserLogin): Promise<User | null>;

}