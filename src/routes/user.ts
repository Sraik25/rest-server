import { Router } from 'express';
import {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} from '../controllers/userController';

const router = Router();

router.get('/', usersGet);
router.post('/', usersPost);
router.put('/:id', usersPut);
router.patch('/', usersPatch);
router.delete('/', usersDelete);

export default router;
