import { FastifyPluginCallback } from 'fastify';

import createRoute from './create.router';
import getRoute from './getmemo.router';

const memoRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(createRoute, { prefix: '/' });
  fastify.register(getRoute, { prefix: '/' });

  done();
};

export default memoRoute;
