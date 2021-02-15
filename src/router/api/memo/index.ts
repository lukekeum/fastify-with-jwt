import { FastifyPluginCallback } from 'fastify';

const memoRoute: FastifyPluginCallback = (fastify, opts, done) => {
  done();
};

export default memoRoute;
