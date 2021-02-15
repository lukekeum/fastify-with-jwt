import Memo from '@src/entity/memo.entity';
import { FastifyPluginCallback } from 'fastify';

interface IGetByIDParams {
  id: string;
}

const getRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/get', async (req, res) => {
    try {
      const memo = await Memo.find();

      return res.status(200).send({ data: memo });
    } catch (err) {
      fastify.log.error(err);
      return res.status(500).send({ error: err });
    }
  });

  fastify.get('/get/:id', async (req, res) => {
    const id = parseInt((req.params as IGetByIDParams)['id'], 10);

    if (isNaN(id)) {
      return res.status(401).send({ message: 'id should be number' });
    }

    try {
      const memo = await Memo.findOne({ id });

      if (!memo) {
        return res.status(401).send({ message: 'Memo not found' });
      }

      return res.status(200).send({
        data: { id: memo.id, content: memo.content, author_id: memo.user_id },
      });
    } catch (err) {
      fastify.log.error(err);
      return res.status(500).send({ error: err });
    }
  });

  done();
};

export default getRoute;
