import RecipeModel from "../recipes/recipes.model";
import UserModel from "./users.model";

export const getUserById = async (id: string) => {
  try {
    const userRecipes = await RecipeModel.find({ userId: id });
    const user = await UserModel.findById(id); 
    
    return { ...user?.toObject(), myRecipes: userRecipes };
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${error}`);
  }
}

export const preferredRecipe = async (userId: string, recipeId: string, type: "add" | "delete") => {
  try {
    const findRecipe = await RecipeModel.findById(recipeId);
    if (!findRecipe) throw new Error("La receta no existe");

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      type === "add"
        ? { $addToSet: { favouritesRecipes: findRecipe } }
        : { $pull: { favouritesRecipes: { _id: recipeId } } },
      { new: true }
    );

    if (!updateUser) new Error("El usuario no fue encontrado");

    const isAdded = updateUser?.favouritesRecipes.some(recipe => 
      recipe._id.toString() === recipeId
    );
    if (!isAdded) new Error(`No se ${type === "add" ? "agrego la": "elimino de"} receta a favoritos del usuario`);


    return findRecipe
  } catch(error) {
    throw new Error(`${error}`);
  }
}