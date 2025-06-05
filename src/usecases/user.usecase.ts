import bcrypt from 'bcrypt';
import { z } from "zod";
import { UserCreate, UserRepository, UserResponse } from "../interfaces/users.interface";
import { UserRepositoryPrisma } from "../repositories/user.repositoriy";

export class UserUseCase {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepositoryPrisma();
    }
    async create({ name, email, password, role }: UserCreate): Promise<UserResponse> {

        const schemaCreateUser = z.object({
            name: z.string().min(1, "Nome é obrigatório"),
            email: z.string().email("Email inválido"),
            password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").nonempty("Senha é obrigatória"),
            role: z.string().min(1, "Deve ser atribuído pelo menos um papel"),
        });

        try {
            await schemaCreateUser.parse({ email, name, password, role });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.map(e => `${e.message}`).join(', ');
                throw new Error(errorMessages);
            }
            throw error;
        } const verifyUserExists = await this.userRepository.findByEmail(email);
        if (verifyUserExists) {
            throw new Error('Email já exjste');
        }

        const result = await this.userRepository.create({ name, email, password, role });

        return result;
    }

    async findAll(): Promise<UserResponse[]> {
        const result = await this.userRepository.findAll();
        return result;
    }

    async currentUser(userId: string): Promise<UserResponse> {
        const result = await this.userRepository.currentUser(userId);
        return result;
    }

    async delete(userId: string): Promise<void> {
        await this.userRepository.delete(userId);
    }
}