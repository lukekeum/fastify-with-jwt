import app from '@src/app';
import User from '@src/entity/user.entity';
import { FastifyPluginCallback } from 'fastify';

interface IUserObjectType {
  id: number;
  userid: string;
  nickname: string;
  iat: number;
}

const meRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/me', async (req, res) => {
    const authToken = req.headers['x-auth-token'];
    if (!authToken) {
      return res.status(401).send({ message: 'Auth token not found' });
    }

    // Decode authToken
    const decodedToken = fastify.jwt.decode(authToken as string);
    const userObj = <IUserObjectType>Object.assign({}, decodedToken);

    try {
      const user = await User.findOne({ id: userObj.id });

      if (!user) {
        return res.status(401).send({ message: 'Invalid token' });
      }

      const { id, userid, nickname } = user;

      return res.status(200).send({ data: { id, userid, nickname } });
    } catch (err) {
      app.server.log.error(err);
      return res.status(401).send({ message: err });
    }
  });

  done();
};

export default meRoute;
