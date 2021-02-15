import { FastifyPluginCallback } from 'fastify';

import authRoute from './auth';
import memoRoute from './memo';

const rootRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authRoute, { prefix: '/auth' });
  fastify.register(memoRoute, { prefix: '/memo' });

  done();
};

export default rootRoute;
