import 'fastify';
import { TokenJwt } from '../interfaces/auth.interfaces';

declare module 'fastify' {
  interface FastifyRequest {
    user?: TokenJwt;
  }
}
