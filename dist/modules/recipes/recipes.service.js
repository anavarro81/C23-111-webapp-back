"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipes_model_1 = __importDefault(require("./recipes.model"));
const cloudinary_config_1 = require("../../config/cloudinary.config");
const rates_model_1 = __importDefault(require("../rates/rates.model"));
const categories_model_1 = __importDefault(require("../categories/categories.model"));
const createRecipe = (data, fileBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const folder = 'recipes';
        const img = yield (0, cloudinary_config_1.uploadToCloudinary)(fileBuffer, folder);
        if (!img) {
            return { cloudinaryError: true };
        }
        const categories = yield categories_model_1.default.find({
            name: { $in: data.category },
        });
        if (!categories || categories.length !== (((_a = data.category) === null || _a === void 0 ? void 0 : _a.length) || 0)) {
            return { categoriesNotFound: true };
        }
        const newRecipe = new recipes_model_1.default(Object.assign(Object.assign({}, data), { image: img.secure_url }));
        const savedRecipe = yield newRecipe.save();
        if (!savedRecipe) {
            return { mongodbError: true };
        }
        return { savedRecipe };
    }
    catch (error) {
        throw new Error(`Error al crear la receta.`);
    }
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipes_model_1.default.find({ status: "approved" });
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
    }
    catch (error) {
        throw new Error(`Error al obtener las recetas.`);
    }
});
const getAllpending = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipes_model_1.default.find({ status: "pending" });
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
    }
    catch (error) {
        throw new Error(`Error al obtener las recetas.`);
    }
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipes_model_1.default.findById(id);
        if (!recipe) {
            return { recipeNotFound: true };
        }
        const rates = yield rates_model_1.default.find({ recipe: recipe.id }).exec();
        const recipeWithRates = Object.assign(Object.assign({}, recipe.toObject()), { rates: rates.length > 0 ? rates : [] });
        return { recipeWithRates };
    }
    catch (error) {
        throw new Error(`Error al obtener la receta.`);
    }
});
const getUserRecipes = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipes_model_1.default.find({ userId: id });
        if (!recipes) {
            return { recipeNotFound: true };
        }
        return { recipes };
    }
    catch (error) {
        throw new Error(`Error al obtener las recetas.`);
    }
});
const editStatusById = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipes_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!recipe) {
            return null;
        }
        return { recipe };
    }
    catch (error) {
        throw new Error(`Error al editar la receta.`);
    }
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeDeleted = yield recipes_model_1.default.findByIdAndDelete(id);
        if (!recipeDeleted) {
            return { mongodbError: true };
        }
        const imgDeleted = yield (0, cloudinary_config_1.deleteToCloudinary)(recipeDeleted.image);
        if (!imgDeleted) {
            return { cloudinaryError: true };
        }
        return { recipeDeleted };
    }
    catch (error) {
        throw new Error(`Error al eliminar la receta.`);
    }
});
const recipeService = {
    createRecipe,
    getAll,
    getAllpending,
    getById,
    getUserRecipes,
    editStatusById,
    deleteById
};
exports.default = recipeService;
//# sourceMappingURL=recipes.service.js.map