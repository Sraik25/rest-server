import { Router } from 'express';
import { check } from 'express-validator';
import {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} from '../controllers/userController';


import {
  existUserById,
  isValidatedEmail,
  isValidatedRole,
} from '../helpers/db-validator';
import { hasRole, validateJWT, validatorFields } from '../middlewares';


const router = Router();

router.get('/', usersGet);

router.post(
  '/',
  [
    check('name', 'El nombre no es obligatorio').not().isEmpty(),
    check(
      'password',
      'El password no es obligatorio y debe ser mas de 6 letras'
    )
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(isValidatedEmail),
    // check('role', 'No es un rol Válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidatedRole),
    validatorFields,
  ],
  usersPost
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidatedRole),
    validatorFields,
  ],
  usersPut
);

router.patch('/', usersPatch);

router.delete(
  '/:id',
  [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN-ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validatorFields,
  ],
  usersDelete
);

export default router;
