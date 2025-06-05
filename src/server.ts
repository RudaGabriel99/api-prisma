import fastify, { FastifyInstance } from 'fastify';
import { authRoutes } from './routes/auth.routes';
import { contactRoutes } from './routes/contact.routes';
import { userRoutes } from './routes/user.routes';
import { validateToken } from './utils/validateToken';
const app: FastifyInstance = fastify();

// dotenv.config();

// app.register(fastifyCors, {
//   origin: true,
// });

app.register(authRoutes, {
  prefix: '/auth'
})

app.register(async function (fastify) {
  fastify.addHook('preHandler', validateToken);
  fastify.register(userRoutes, { prefix: '/users' });
});

app.register(async function (fastify) {
  fastify.addHook('preHandler', validateToken);
  fastify.register(contactRoutes, { prefix: '/contacts' });
}
);



app.listen({
  port: 3100,
},
  () => console.log('Server is running on port 3100'),
)