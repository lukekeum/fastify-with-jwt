import { FastifyPluginCallback } from 'fastify';

const rootRoute: FastifyPluginCallback = (fastify, opts, done) => {
  done();
};

export default rootRoute;
