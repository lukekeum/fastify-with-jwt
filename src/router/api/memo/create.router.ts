import app from '@src/app';
import Memo from '@src/entity/memo.entity';
import User from '@src/entity/user.entity';
import { FastifyPluginCallback } from 'fastify';
import { UsingJoinTableIsNotAllowedError } from 'typeorm';

interface ICreateBody {
  content: string;
  userid: string;
}

interface IUserObjectType {
  id: number;
  userid: string;
  nickname: string;
  iat: number;
}

const createRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/create', async (req, res) => {
    const { content, userid } = <ICreateBody>req.body;

    const getUserByToken = async (token: string): Promise<User> => {
      const decodedValue = <IUserObjectType>(
        Object.assign({}, fastify.jwt.decode(token))
      );

      try {
        const user = await User.findOne({ id: decodedValue.id });

        if (!user) {
          return res.status(401).send({ message: 'Invalid token' });
        }

        return user;
      } catch (err) {
        fastify.log.error(err);
        return res.status(401).send({ message: err });
      }
    };

    if (!userid) {
      const authToken = <string>req.headers['x-auth-token'];

      if (!authToken) {
        return res.status(401).send({ message: 'JWT not found' });
      }
    }

    try {
      const jwtToken = <string>req.headers['x-auth-token'];
      const user =
        (await User.findOne({ userid: userid })) ||
        (await getUserByToken(jwtToken));

      if (!user) {
        return res.status(401).send({ message: 'User not found' });
      }

      const memo = new Memo();
      memo.content = content;
      memo.user = user;

      await memo.save();
      return res.status(201).send({ message: 'Created memo' });
    } catch (err) {
      app.server.log.error(err);
      return res.status(500).send({ message: err });
    }
  });

  done();
};

export default createRoute;
