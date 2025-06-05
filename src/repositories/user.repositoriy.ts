import bcrypt from 'bcrypt';
import { prisma } from "../database/prisma.client";
import { UserCreate, UserRepository, UserResponse } from "../interfaces/users.interface";

class UserRepositoryPrisma implements UserRepository {
  async create(user: UserCreate): Promise<UserResponse> {

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const result = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role
      },
    });
    const { password: userPassword, ...userWithoutPassword } = result;

    return userWithoutPassword
  }

  async findByEmail(id: string): Promise<UserResponse | null> {
    const result = await prisma.user.findUnique({
      where: { id }

    });
    return result || null;
  }

  async findAll(): Promise<UserResponse[]> {
    const result = await prisma.user.findMany();
    return result;
  }

  async currentUser(userId: string): Promise<UserResponse> {
    const result = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (result === null) {
      throw new Error('User not found');
    }

    const { password: teste, ...userWithoutPassword } = result;

    return userWithoutPassword
  }

  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId
      }
    });
  }
}

export { UserRepositoryPrisma };
