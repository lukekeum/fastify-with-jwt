import { FastifyPluginCallback } from 'fastify';

import createRoute from './create.router';

const memoRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(createRoute, { prefix: '/' });

  done();
};

export default memoRoute;
