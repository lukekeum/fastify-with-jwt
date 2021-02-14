import fastify, { FastifyInstance } from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyJwt from 'fastify-jwt';
import fastifyCookie from 'fastify-cookie';
import { IncomingMessage, Server, ServerResponse } from 'http';
import rootRoute from './router/api';

class App {
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>;

  constructor() {
    const { JWT_SECRET = '' } = process.env;

    this.server = fastify({ logger: true });

    this.server.register(fastifyCompress);
    this.server.register(fastifyCookie);
    this.server.register(fastifyJwt, {
      secret: JWT_SECRET,
      cookie: {
        cookieName: 'token',
      },
    });

    this.server.register(rootRoute);
  }

  async start() {
    const { PORT = String(5000) } = process.env;

    try {
      await this.server.listen(PORT, '0.0.0.0');
    } catch (err) {
      this.server.log.error(err);
    }
  }
}

const app = new App();

export default app;
