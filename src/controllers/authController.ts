import { RequestHandler, Request, Response } from 'express';
import User from '../models/user';
import { UserDto, UserUpdateDto } from '../dtos/userDto';
import { compareSync } from 'bcryptjs';
import { generatedJWT } from '../helpers/generated-jwt';
import { googleVerify } from '../helpers/google-verify';

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

const googleSignIn = async (req: Request, res: Response) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);

    const { email, name, picture } = googleUser;

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        email,
        name,
        password: ':P',
        image: picture,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'Hable con el administrador usuario bloqueado',
      });
    }

    const token = await generatedJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      ok: false,
      msg: 'El token no se puedo verificar',
    });
  }
};

export { googleSignIn, login };
