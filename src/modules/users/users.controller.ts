import { Request, Response } from "express";
import { preferredRecipe, getUserById } from "./users.service";

export const getUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "El ID es requerido." });
    return;
  }
  try {
    const findedUser = await getUserById(id);
    res.status(201).json({
      message: "Receta obtenida exitosamente",
      user: findedUser,
    });
  } catch(error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({
      message: errorMessage,
    });
  }
};

export const favouriteRecipe = async (req: Request, res: Response) => {
  const { userId, recipeId, type } = req.body;
  if (!type) {
    res.status(400).json({ message: "El tipo de accion para seccion favoritos es requerido." });
    return;
  }
  if (!userId || !recipeId) {
    res.status(400).json({ message: "El id de la receta y usuario son requeridos." });
    return;
  }
  try {
    const toggleRecipe = await preferredRecipe(userId, recipeId, type);
    
    res.status(201).json({
      message: `Receta se ${type === "add" ? "agrego a": "elimino de"} favoritos del usuario`,
      recipe: toggleRecipe,
    });
  } catch(error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({
      message: errorMessage,
    });
  }
};