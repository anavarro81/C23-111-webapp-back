import RecipeModel from "./recipes.model";
import { uploadToCloudinary, deleteToCloudinary } from "../../config/cloudinary.config";
import { IRecipeSchema } from "./recipes.model"
import RateModel from "../rates/rates.model";
import CategoryModel from "../categories/categories.model";


const createRecipe = async (data: Partial<IRecipeSchema>, fileBuffer: Buffer) => {
  try {

    const folder = 'recipes';

    const img = await uploadToCloudinary(fileBuffer, folder);

    if (!img) {
      return { cloudinaryError: true }
    }

    const categories = await CategoryModel.find({
      name: { $in: data.category },
    });

    if (!categories || categories.length !== (data.category?.length || 0)) {
      return { categoriesNotFound: true }
    }


    const newRecipe = new RecipeModel({
      ...data,
      image: img.secure_url,
    });

    const savedRecipe = await newRecipe.save();

    if (!savedRecipe) {
      return { mongodbError: true }
    }

    return { savedRecipe };
  } catch (error) {
    throw new Error(`Error al crear la receta.`);
  }
};

const getAll = async () => {
  try {
    const recipes = await RecipeModel.find({ status: "approved" });

    if (!recipes) {
      return null;
    }

    const formattedRecipes = recipes.map(recipe => ({
      id: recipe._id,
      name: recipe.name,
      description: recipe.description,
      category: recipe.category,
      ingredients: recipe.ingredients,
      totalSteps: recipe.steps.length,
      image: recipe.image,
      rateAverage: recipe.rateAverage,
      totalRates: recipe.totalRates,
      createdAt: recipe.createdAt,
      userId: recipe.userId
    }));

    return formattedRecipes;
  } catch (error) {
    throw new Error(`Error al obtener las recetas.`);
  }
};

const getAllpending = async () => {
  try {
    const recipes = await RecipeModel.find({ status: "pending" });

    if (!recipes) {
      return null;
    }

    const formattedRecipes = recipes.map(recipe => ({
      id: recipe._id,
      name: recipe.name,
      description: recipe.description,
      category: recipe.category,
      ingredients: recipe.ingredients,
      totalSteps: recipe.steps.length,
      image: recipe.image,
      rateAverage: recipe.rateAverage,
      totalRates: recipe.totalRates,
      createdAt: recipe.createdAt,
      userId: recipe.userId,
  
    }));

    return formattedRecipes;
  } catch (error) {
    throw new Error(`Error al obtener las recetas.`);
  }
};

const getById = async (id: string) => {
  try {
    const recipe = await RecipeModel.findById(id);

    if (!recipe) {
      return { recipeNotFound: true };
    }

    const rates = await RateModel.find({ recipe: recipe.id }).exec();

    const recipeWithRates = {
      ...recipe.toObject(),
      rates: rates.length > 0 ? rates : []
    };

    return { recipeWithRates };
  } catch (error) {
    throw new Error(`Error al obtener la receta.`);
  }
};

const getUserRecipes = async (id: string) => {
  try {
    const recipes = await RecipeModel.find({ userId: id });

    if (!recipes) {
      return { recipeNotFound: true };
    }

    return { recipes };
  } catch (error) {
    throw new Error(`Error al obtener las recetas.`);
  }
};

const editStatusById = async (id: string, status: string) => {
  try {
    const recipe = await RecipeModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!recipe) {
      return null;
    }

    return { recipe };
  } catch (error) {
    throw new Error(`Error al editar la receta.`);
  }
};

const deleteById = async (id: string) => {
  try {
    const recipeDeleted = await RecipeModel.findByIdAndDelete(id);

    if (!recipeDeleted) {
      return { mongodbError: true }
    }

    const imgDeleted = await deleteToCloudinary(recipeDeleted.image);

    if (!imgDeleted) {
      return { cloudinaryError: true }
    }

    return { recipeDeleted };
  } catch (error) {
    throw new Error(`Error al eliminar la receta.`);
  }
};

const recipeService = {
  createRecipe,
  getAll,
  getAllpending,
  getById,
  getUserRecipes,
  editStatusById,
  deleteById
};

export default recipeService;
