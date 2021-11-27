import { Category, Product, Role, User } from '../models';

const isValidatedRole = async (role = '') => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) throw new Error(`El rol ${role} no ésta registrado en la BD`);
};

const isValidatedEmail = async (email: string) => {
  const userExist = await User.findOne({ email });

  if (userExist) throw new Error(`El correo${email} ya esta registrado`);
};

const existUserById = async (id: string) => {
  const userExist = await User.findById({ id });

  if (userExist) throw new Error(`El id ${id} ya no existe`);
};

const existCategory = async (id: string) => {
  const categoryExist = await Category.findById({ id });

  if (categoryExist) throw new Error(`La categoria con el ${id} ya no existe`);
};

const existProduct = async (id: string) => {
  const productExist = await Product.findById({ id });

  if (productExist) throw new Error(`La producto con el ${id} ya no existe`);
};

export {
  existCategory,
  existProduct,
  existUserById,
  isValidatedEmail,
  isValidatedRole,
};
