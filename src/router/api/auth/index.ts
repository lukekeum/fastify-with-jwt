import { FastifyPluginCallback } from 'fastify';
import signupRoute from './signup.router';
import signinRoute from './signin.router';
import meRoute from './me.router';

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(signupRoute, { prefix: '/' });
  fastify.register(signinRoute, { prefix: '/' });
  fastify.register(meRoute, { prefix: '/' });

  done();
};

export default authRoute;
