import { Router } from 'express';
import { check } from 'express-validator';
import { googleSignIn, login } from '../controllers/authController';
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

router.post(
  '/google',
  [
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    validatorFields,
  ],
  googleSignIn
);

export default router;
