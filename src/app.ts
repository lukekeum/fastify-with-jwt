import fastify, { FastifyInstance } from 'fastify';
import fastifyCompress from 'fastify-compress';
import { IncomingMessage, Server, ServerResponse } from 'http';
import rootRoute from './router/api';

class App {
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>;

  constructor() {
    this.server = fastify({ logger: true });

    this.server.register(fastifyCompress);

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
