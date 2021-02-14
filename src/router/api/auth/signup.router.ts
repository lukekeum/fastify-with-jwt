import { FastifyPluginCallback } from 'fastify';

import app from '@src/app';
import User from '@src/entity/user.entity';

type TSignupParam = {
  id: string;
  nickname: string;
  password: string;
};

const signupRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/signup', async (req, res) => {
    const { id: userid, nickname, password } = <TSignupParam>req.body;

    try {
      const user = await User.findOne({ userid, password });

      if (user) {
        return res.status(401).send({ message: 'User-id already exists' });
      }

      const registerUser = new User();
      registerUser.userid = userid;
      registerUser.nickname = nickname;
      registerUser.password = password;

      await registerUser.save();

      return res.status(201).send({
        message: 'Sign in successfully',
        data: { id: registerUser.id, userid, nickname },
      });
    } catch (err) {
      app.server.log.error(err);
    }
  });

  done();
};

export default signupRoute;
