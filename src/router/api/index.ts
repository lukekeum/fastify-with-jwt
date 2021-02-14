import { FastifyPluginCallback } from 'fastify';

import authRoute from './auth';

const rootRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authRoute, { prefix: '/auth' });

  done();
};

export default rootRoute;
