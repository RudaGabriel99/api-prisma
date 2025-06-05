import bcrypt from 'bcrypt';
import { FastifyInstance } from "fastify";
import jwt from 'jsonwebtoken';
import { TokenJwt } from '../interfaces/auth.interfaces';
import { UserCreate } from '../interfaces/users.interface';
import { UserUseCase } from "../usecases/user.usecase";

export async function userRoutes(fastify: FastifyInstance) {
    const userUserCase = new UserUseCase();
    fastify.post<{ Body: UserCreate }>('/create', async (request, reply) => {
        try {

            const { name, email, password, role } = request.body;
            const data = await userUserCase.create({
                name,
                email,
                password,
                role
            });
            reply.send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }
    )

    fastify.get('/findAll', async (request, reply) => {
        try {
            const data = await userUserCase.findAll();
            reply.send(data)
        } catch (error) {
            reply.code(500).send
        }
    })

    fastify.get('/currentUser', async (request, reply) => {
        try {
            if (!request.user) {
                return reply.code(401).send({ message: 'Unauthorized' });
            }

            const data = await userUserCase.currentUser(request.user.userId);
            return reply.send(data);
        } catch (error) {
            return reply.code(500).send({ message: 'Erro interno', error });
        }
    });


    fastify.delete('/delete', async (request, reply) => {
        try {
            const token = request.headers.authorization;
            if (!token) {
                reply.code(401).send({ message: 'Unauthorized' });
                return;
            }
            const tokenWithoutBearer = token?.replace('Bearer ', '');
            const jwtReq = jwt.decode(tokenWithoutBearer, {}) as TokenJwt
            const data = await userUserCase.delete(jwtReq.userId);
            reply.send({
                message: "Usuário deletado com sucesso"
            })
        } catch (error) {
            reply.code(500).send(error)
        }
    }
    )
}