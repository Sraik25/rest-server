import { NextFunction, Response, Request, RequestHandler } from 'express';

const isAdminRole: RequestHandler = (req, res, next) => {
  if (!req.user)
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin verificar el token',
    });

  const { name, role } = req.user;

  if (role !== 'ADMIN_ROLE')
    return res.status(401).json({
      msg: `${name} no es administrador - No puede hacer eso`,
    });
};

const hasRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user)
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar el token primerp',
      });

    if (roles.includes(req.user.role))
      return res.status(401).json({
        msg: `El servicio requiere uno de estos ${roles}`,
      });

    next();
  };
};

export { hasRole, isAdminRole };
