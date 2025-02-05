import UserModel, { User } from "../users/users.model";

export const createdUser = async (user: Partial<User>) => {
  try {
    const newUser = new UserModel(user);
    await newUser.save(); 

    return newUser;
  } catch(error) {
    throw new Error(`Error al crear usuario.`);
  }
}

export const findUserByEmail = async (email: string) => {
  try {
    const findedUser = await UserModel.findOne({ email });
    return findedUser;
  } catch(error) {
    throw new Error(`Error al crear usuario.`);
  }
}