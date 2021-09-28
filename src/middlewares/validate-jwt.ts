import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import User from '../models/user';

const secretKey = process.env.SECRET_KEY || '';

const validateJWT: RequestHandler = async (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: ' No hay token en la petición',
    });
  }

  try {
    const { uid }: any = verify(token, secretKey);

    const user = await User.findById(uid);

    if (!user)
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe en DB',
      });

    if (!user.status)
      return res.status(401).json({
        msg: 'Token no válido - usuario con estado: false',
      });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};

export { validateJWT };
