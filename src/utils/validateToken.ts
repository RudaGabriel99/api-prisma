import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { TokenJwt } from '../interfaces/auth.interfaces';

export function validateToken(request: FastifyRequest, reply: FastifyReply, done: Function) {
    const token = request.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
        reply.code(401).send({ message: 'Unauthorized' });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY!) as TokenJwt;
        request.user = decoded;
        done();
    } catch (err) {
        reply.code(401).send({ message: 'Unauthorized' });
    }
}