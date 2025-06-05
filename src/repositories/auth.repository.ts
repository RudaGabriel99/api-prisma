import { prisma } from "../database/prisma.client";
import { UserLogin } from "../interfaces/auth.interfaces";
import { User } from "../interfaces/users.interface";


class AuthRepositoryPrisma {
  async login({
    email,
  }: UserLogin): Promise<User | null> {

    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    });
    console.log('Usuário retornado pelo Prisma:', user);
    return user || null;

  }

  async loginAdmin({
    email,
  }: UserLogin): Promise<User | null> {

    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    });
    console.log('Usuário retornado pelo Prisma:', user);
    return user || null;
  }
}
export { AuthRepositoryPrisma };

