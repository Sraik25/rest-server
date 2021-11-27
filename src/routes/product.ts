import { Router } from 'express';
import { check } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController';
import { existProduct } from '../helpers/db-validator';
import { isAdminRole, validateJWT, validatorFields } from '../middlewares';

const router = Router();

// {{url}}/api/products

router.get('/', getProducts);

router.get(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProduct),
    validatorFields,
  ],
  getProductById
);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'El campo es obligatorio').not().isEmpty(),
    check('category', 'No es un ID válido').isMongoId(),
    check('category').custom(existProduct),
    validatorFields,
  ],
  createProduct
);

router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'El campo es obligatorio').not().isEmpty().isString(),
    check('user', 'El campo es obligatorio').not().isEmpty(),
    check('category', 'El campo es obligatorio').not().isEmpty(),
    check('price', 'El campo es obligatorio').not().isEmpty(),
    check('id').custom(existProduct),
    validatorFields,
  ],
  updateProduct
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProduct),
    validatorFields,
  ],
  deleteProduct
);
export default router;
