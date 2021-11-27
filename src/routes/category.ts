import { Router } from 'express';
import { check } from 'express-validator';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/categoryController';
import { existCategory } from '../helpers/db-validator';
import { isAdminRole, validateJWT, validatorFields } from '../middlewares';

const router = Router();

// {{url}}/api/categories

router.get('/', getCategories);

router.get(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existCategory),
    validatorFields,
  ],
  getCategoryById
);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'El campo es obligatorio').not().isEmpty(),
    validatorFields,
  ],

  createCategory
);

router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'El campo es obligatorio').not().isEmpty(),
    check('id').custom(existCategory),
    validatorFields,
  ],
  updateCategory
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existCategory),
    validatorFields,
  ],
  deleteCategory
);

export default router;
