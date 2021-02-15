import { FastifyPluginCallback } from 'fastify';
import bcrypt from 'bcrypt';

import app from '@src/app';
import User from '@src/entity/user.entity';

type TSigninParam = {
  id: string;
  password: string;
};

const signinRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/signin', async (req, res) => {
    const { id: userid, password } = <TSigninParam>req.body;

    try {
      const user = await User.findOne({ userid });

      if (!user) {
        return res.status(401).send({ message: 'User not found with userid' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        const { id, userid, nickname } = user;
        const token = fastify.jwt.sign({ id, userid, nickname });
        return res.status(201).send({
          message: 'Signed in',
          data: { id: user.id, userid, nickname: user.nickname },
          token: token,
        });
      }
      return res.status(401).send({ message: 'Password incorrect' });
    } catch (err) {
      app.server.log.error(err);
    }
  });

  done();
};

export default signinRoute;
