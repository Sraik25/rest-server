import { RequestHandler } from 'express';

const usersGet: RequestHandler = (req, res) => {
  const params = req.params;

  res.json({
    msg: 'Get- API - Controllador',
  });
};

const usersPost: RequestHandler = (req, res) => {
  const { body } = req;

  res.json({
    msg: 'Post- API - Controllador',
  });
};

const usersPut: RequestHandler = (req, res) => {
  const { id } = req.params;

  res.json({
    msg: 'Put- API - Controllador',
  });
};

const usersPatch: RequestHandler = (req, res) => {
  res.json({
    msg: 'Patch- API - Controllador',
  });
};

const usersDelete: RequestHandler = (req, res) => {
  res.json({
    msg: 'Delete- API - Controllador',
  });
};

export { usersDelete, usersGet, usersPatch, usersPost, usersPut };
