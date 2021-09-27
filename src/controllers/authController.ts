import { RequestHandler } from 'express';
import User from '../models/user';
import { UserDto, UserUpdateDto } from '../dtos/userDto';
import { compareSync } from 'bcryptjs';
import { generatedJWT } from '../helpers/generated-jwt';

const login: RequestHandler = async (req, res) => {
  const { email, password }: UserDto = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo',
      });
    }

    if (!user.status) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo - estado : false',
      });
    }

    const validatedPassword = compareSync(password, user.password);

    if (!validatedPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password ',
      });
    }

    const token = await generatedJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: 'Algo salio mal',
    });
  }
};

export { login };
