import { HttpException, HttpStatus } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository, LoginResponse, UserLogin } from "../interfaces/auth.interfaces";
import { AuthRepositoryPrisma } from "../repositories/auth.repository";

export class AuthUseCase {
    private authRepository: AuthRepository;
    constructor() {
        this.authRepository = new AuthRepositoryPrisma();
    }
    async login({ email, password }: UserLogin): Promise<LoginResponse> {
        const user = await this.authRepository.login({ email, password });
        if (!user) {
            throw new HttpException('Email ou senha incorretos', HttpStatus.FORBIDDEN);
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            throw new Error('Email ou senha incorretos');
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: '7d' });


        const { password: userPassword, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    async loginAdmin({ email, password }: UserLogin): Promise<LoginResponse> {
        const user = await this.authRepository.login({ email, password });
        if (!user) {
            throw new Error('Email ou senha incorretos');
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            throw new Error('Email ou senha incorretos');
        }
        if (!user.role.includes('admin')) {
            throw new Error('Unauthorized');
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: '7d' });


        const { password: userPassword, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
}