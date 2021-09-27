import { RequestHandler } from 'express';
import { genSaltSync, hashSync } from 'bcryptjs';

import { UserDto, UserUpdateDto } from '../dtos/userDto';
import User from '../models/user';

const usersGet: RequestHandler = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, users] = await Promise.all<number, UserUpdateDto[]>([
    User.count({ status: true }),
    User.find({ status: true }, '', {
      skip: Number(from),
      limit: Number(limit),
    }),
  ]);

  res.json({
    total,
    users,
  });
};

const usersPost: RequestHandler = async (req, res) => {
  const { email, name, password, role }: UserDto = req.body;

  const user = new User({ email, name, password, role });

  // encriptar la contraseña

  const salt = genSaltSync(10);
  user.password = hashSync(password, salt);

  user.save();

  res.json({
    msg: 'Post- API - Controllador',
    user,
  });
};

const usersPut: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { _id, google, ...rest }: UserUpdateDto = req.body;

  //TODO validar contra base datos

  if (rest.password) {
    const salt = genSaltSync(10);
    rest.password = hashSync(rest.password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    msg: 'Put- API - Controllador',
    user,
  });
};

const usersPatch: RequestHandler = (req, res) => {
  res.json({
    msg: 'Patch- API - Controllador',
  });
};

const usersDelete: RequestHandler = async (req, res) => {
  const { id } = req.params;

  // fisical delete
  // const user = await User.findByIdAndDelete(id);

  // logical delete
  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({
    msg: 'Delete- API - Controllador',
    id,
  });
};

export { usersDelete, usersGet, usersPatch, usersPost, usersPut };
