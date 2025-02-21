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
const rates_model_1 = __importDefault(require("./rates.model"));
const recipes_model_1 = __importDefault(require("../recipes/recipes.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// Comprueba si el usuario ya a reseñado la receta
const checkifReviewerExists = (reviewerId, recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewerExist = yield rates_model_1.default.findOne({ reviewer: reviewerId, recipe: recipeId });
        // El operador !! convierte a booleano el valor de reviewerExist
        return { status: 'OK', reviewerExist: !!reviewerExist };
    }
    catch (error) {
        return { status: 'failed', error };
    }
});
const createRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRate = new rates_model_1.default(req.body);
        // Busco la receta a la que se le quiere agregar la reseña
        const recipe = yield recipes_model_1.default.findById(newRate.recipe);
        if (!recipe) {
            res.status(404).json({ message: "Receta no encontrada" });
            return;
        }
        newRate.recipe = new mongoose_1.default.Types.ObjectId(newRate.recipe);
        const reviewerID = new mongoose_1.default.Types.ObjectId(newRate.reviewer);
        const recipeID = new mongoose_1.default.Types.ObjectId(newRate.recipe);
        const reviewerExist = yield checkifReviewerExists(reviewerID, recipeID);
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
        const updatedRecipe = yield recipes_model_1.default.findByIdAndUpdate(newRate.recipe, { totalRates, rateAverage: newRateAverage }, { new: true });
        if (!updatedRecipe) {
            res.status(404).json({ message: "Error al actualizar la receta" });
            return;
        }
        const createdRate = yield newRate.save();
        res.status(201).json(createdRate);
    }
    catch (error) {
        // Compureba si el error devuelve es una instancia de Error
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});
const deleteRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRate = yield rates_model_1.default.findByIdAndDelete(req.params.id);
        if (!deletedRate) {
            res.status(404).json({ message: "Reseña no encontrada" });
        }
        res.status(200).json(deletedRate);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const getRatesByRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const recipeId = id;
        if (!id) {
            res.status(400).json({ message: "El ID es requerido." });
            return;
        }
        const result = yield rates_model_1.default.find({ recipe: recipeId }).populate('reviewer');
        if (!result) {
            res.status(404).json({ message: `No hay reseñas para la receta con id ${id}.` });
            return;
        }
        res.status(200).json({
            message: "Receta obtenida exitosamente",
            result,
        });
    }
    catch (error) {
        res.status(500).json(error);
        return;
    }
});
const deleteRatesByRecipeID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "El ID es requerido." });
        return;
    }
    try {
        const deletedRates = yield rates_model_1.default.deleteMany({ recipe: id });
        if (!deletedRates) {
            res.status(404).json({ message: `Reseñas no encontradas para la receta con id = ${id}` });
            return;
        }
        // Si se borran las reseñas se ponen a cero los contadores de total de reseñas y promedio de reseñas
        const updateRecipeRates = yield recipes_model_1.default.findByIdAndUpdate(id, { totalRates: 0, rateAverage: 0 }, { new: true });
        if (!updateRecipeRates) {
            res.status(404).json({ message: `Error al actualizar la receta con id = ${id}` });
            return;
        }
        res.status(200).json({
            message: "Reseñas eliminadas exitosamente",
            deletedRates,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.default = { createRate, deleteRate, getRatesByRecipe, deleteRatesByRecipeID };
//# sourceMappingURL=rates.controller.js.map