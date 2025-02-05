import { Request, Response } from "express";
import recipeService from "./recipes.service";

const createRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { body } = req;

    if (!req.file) {
      res.status(400).json({ message: "No se ha subido ninguna imagen." });
      return;
    }

    const fileBuffer = req.file.buffer;

    const result = await recipeService.createRecipe(body, fileBuffer);

    if (!result) {
      res.status(404).json({ message: `Error al crear la receta.` });
      return
    }

    if (result.categoriesNotFound) {
      res.status(404).json({ message: `Una o más categorías no son validas.` });
      return
    }

    if (result.cloudinaryError) {
      res.status(404).json({ message: `Error al guardar la imagen en cloudinary.` });
      return
    }

    if (result.mongodbError) {
      res.status(404).json({ message: `Error al guardar la receta en MongoDB.` });
      return
    }

    res.status(201).json({
      message: "Receta creada exitosamente",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
    return
  }
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await recipeService.getAll();

    if (!result) {
      res.status(400).json({ message: `Error al obtener las recetas.` });
      return
    }

    res.status(200).json({
      message: "Recetas obtenidas exitosamente",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
    return
  }
};

const getAllpending = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await recipeService.getAllpending();

    if (!result) {
      res.status(400).json({ message: `Error al obtener las recetas.` });
      return
    }

    res.status(200).json({
      message: "Recetas obtenidas exitosamente",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
    return
  }
};

const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ message: "El ID es requerido." });
      return
    }

    const result = await recipeService.getById(id);

    if (!result) {
      res.status(400).json({ message: `Error al obtener la receta con el id ${id}.` });
      return
    }

    if (result.recipeNotFound) {
      res.status(404).json({ message: `No se encontró la receta con el ID: ${id}` });
      return;
    }

    res.status(201).json({
      message: "Receta obtenida exitosamente",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
    return
  }
};

const getUserRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params

    if (!userId) {
      res.status(400).json({ message: "El ID es requerido." });
      return
    }

    const result = await recipeService.getUserRecipes(userId);

    if (!result) {
      res.status(404).json({ message: `No se encontraron las receta del usuario con el ID: ${userId}` });
      return;
    }

    res.status(201).json({
      message: "Recetas obtenidas exitosamente",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
    return
  }
};

const editStatusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      res.status(400).json({ message: "El ID es requerido." });
      return
    }

    const result = await recipeService.editStatusById(id, status);

    if (!result) {
      res.status(400).json({ message: `Error al obtener la receta con el id ${id}.` });
      return
    }

    res.status(201).json({
      message: "Receta editada exitosamente",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
    return
  }
};

const deleteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ message: "El ID es requerido." });
      return
    }

    const result = await recipeService.deleteById(id);

    if (result.cloudinaryError) {
      res.status(404).json({ message: `Error al eliminar la imagen en cloudinary.` });
      return
    }

    if (result.mongodbError) {
      res.status(404).json({ message: `Error al eliminar la receta en MongoDB.` });
      return
    }

    res.status(201).json({
      message: "Receta eliminada exitosamente",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
    return
  }
}

const recipesController = {
  createRecipe,
  getAll,
  getAllpending,
  getById,
  getUserRecipes,
  editStatusById,
  deleteById
};

export default recipesController;
