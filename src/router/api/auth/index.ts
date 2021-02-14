import { FastifyPluginCallback } from 'fastify';
import signupRoute from './signup.router';
import signinRoute from './signin.router';

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(signupRoute, { prefix: '/' });
  fastify.register(signinRoute, { prefix: '/' });

  done();
};

export default authRoute;
