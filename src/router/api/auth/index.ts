import { FastifyPluginCallback } from 'fastify';
import signupRoute from './signup.router';

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(signupRoute, { prefix: '/' });

  done();
};

export default authRoute;
