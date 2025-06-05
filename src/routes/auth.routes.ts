import { FastifyInstance } from "fastify";
import { UserLogin } from "../interfaces/auth.interfaces";
import { AuthUseCase } from "../usecases/auth.usecase";



export async function authRoutes(fastify: FastifyInstance) {
    const authUseCase = new AuthUseCase();
    
    fastify.post<{ Body: UserLogin }>('/login', async (request, reply) => {
        try {
            const { email, password } = request.body;
            const data = await authUseCase.login({ email, password });
            reply.send(data)
        } catch (error) {
            reply.code(403).send({ message: 'Email ou senha incorretos' });
        }
    })

    fastify.post<{ Body: UserLogin }>('/login/admin', async (request, reply) => {
        try {
            const { email, password } = request.body;
            const data = await authUseCase.loginAdmin({ email, password });
            reply.send(data)
        } catch (error) {
            reply.code(403).send({ message: 'Email ou senha incorretos' });
        }
    }
    )

}