import Role from '../models/role';
import User from '../models/user';

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

export { existUserById, isValidatedEmail, isValidatedRole };
