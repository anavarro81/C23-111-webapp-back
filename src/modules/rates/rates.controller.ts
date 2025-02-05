import { Request, Response } from "express";
import RateModel from "./rates.model";
import RecipeModel from "../recipes/recipes.model";
import mongoose from "mongoose";

// Comprueba si el usuario ya a reseñado la receta
const checkifReviewerExists = async (reviewerId: mongoose.Types.ObjectId, recipeId: mongoose.Types.ObjectId ) => {
  
  try {
    
    const reviewerExist = await RateModel.findOne({ reviewer: reviewerId, recipe: recipeId });
    // El operador !! convierte a booleano el valor de reviewerExist
    return { status: 'OK', reviewerExist: !!reviewerExist };
  } catch (error) {
    return { status: 'failed', error };
  }  
  

  
    
}


const createRate = async (req: Request, res: Response): Promise<void> => {
  try {
    
        
    const newRate = new RateModel(req.body);
   
    
    // Busco la receta a la que se le quiere agregar la reseña
    const recipe = await RecipeModel.findById(newRate.recipe);


    if (!recipe) {
      res.status(404).json({ message: "Receta no encontrada" });
      return;
    }

    
    newRate.recipe = new mongoose.Types.ObjectId(newRate.recipe);

    const reviewerID = new mongoose.Types.ObjectId(newRate.reviewer);
    const recipeID = new mongoose.Types.ObjectId(newRate.recipe);

    const reviewerExist = await checkifReviewerExists(reviewerID, recipeID);    

    if (reviewerExist.status === 'failed') {
      res.status(500).json({ error: reviewerExist.error });
    }

    if (reviewerExist.reviewerExist) {
      res.status(400).json({ message: "El usuario ya ha valorado la receta" });
      return;        
    }
    
    
    // Suma la nueva reseña a las reseñas totales
    const totalRates = recipe.totalRates + 1;    
    const newRateAverage = ((recipe.rateAverage * recipe.totalRates) + newRate.rating) / totalRates;


    const updatedRecipe = await RecipeModel.findByIdAndUpdate(newRate.recipe, { totalRates, rateAverage: newRateAverage }, { new: true })


    if (!updatedRecipe) {
      res.status(404).json({ message: "Error al actualizar la receta" });
      return;
    }
        

    const createdRate = await newRate.save();
    res.status(201).json(createdRate);
  } catch (error) {    
    // Compureba si el error devuelve es una instancia de Error
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
    
  }
}

const deleteRate = async (req: Request, res: Response): Promise<void> => {  
  try {
    
    const deletedRate = await RateModel.findByIdAndDelete(req.params.id);

    if (!deletedRate) {
      res.status(404).json({ message: "Reseña no encontrada" });      
    }

    res.status(200).json(deletedRate);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getRatesByRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const recipeId = id;

    if (!id) {
      res.status(400).json({ message: "El ID es requerido." });
      return
    }

    const result = await RateModel.find({ recipe: recipeId }).populate('reviewer');    

    if (!result) {
      res.status(404).json({ message: `No hay reseñas para la receta con id ${id}.` });
      return
    }

    res.status(200).json({
      message: "Receta obtenida exitosamente",
      result,
    });
  } catch (error) {
    
    res.status(500).json(error);
    return
  }
}

const deleteRatesByRecipeID = async (req: Request, res: Response): Promise<void> => {
  
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "El ID es requerido." });
    return
  }

  try {    
    const deletedRates = await RateModel.deleteMany({ recipe: id });
    
    if (!deletedRates) {
      res.status(404).json({ message: `Reseñas no encontradas para la receta con id = ${id}` });
      return
    }
    
      // Si se borran las reseñas se ponen a cero los contadores de total de reseñas y promedio de reseñas
    const updateRecipeRates = await RecipeModel.findByIdAndUpdate(id, { totalRates: 0, rateAverage: 0 }, { new: true });

    if (!updateRecipeRates) {
      res.status(404).json({ message: `Error al actualizar la receta con id = ${id}` });
      return
    }

    res.status(200).json({
      message: "Reseñas eliminadas exitosamente",
      deletedRates,
    });


  } catch (error) { 
    res.status(500).json(error);
  }

}


export default {createRate, deleteRate, getRatesByRecipe, deleteRatesByRecipeID};