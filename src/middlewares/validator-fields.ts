import { RequestHandler } from 'express';
import { validationResult } from 'express-validator/src/validation-result';

const validatorFields: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

export { validatorFields };
