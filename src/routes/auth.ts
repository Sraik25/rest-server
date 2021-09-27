import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/authController';
import { validatorFields } from '../middlewares/validator-fields';

const router = Router();

router.post(
  '/login',
  [
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password no es obligatorio').not().isEmpty(),
    validatorFields,
  ],
  login
);

export default router;
