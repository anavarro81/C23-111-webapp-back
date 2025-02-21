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
const recipes_service_1 = __importDefault(require("./recipes.service"));
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        if (!req.file) {
            res.status(400).json({ message: "No se ha subido ninguna imagen." });
            return;
        }
        const fileBuffer = req.file.buffer;
        const result = yield recipes_service_1.default.createRecipe(body, fileBuffer);
        if (!result) {
            res.status(404).json({ message: `Error al crear la receta.` });
            return;
        }
        if (result.categoriesNotFound) {
            res.status(404).json({ message: `Una o más categorías no son validas.` });
            return;
        }
        if (result.cloudinaryError) {
            res.status(404).json({ message: `Error al guardar la imagen en cloudinary.` });
            return;
        }
        if (result.mongodbError) {
            res.status(404).json({ message: `Error al guardar la receta en MongoDB.` });
            return;
        }
        res.status(201).json({
            message: "Receta creada exitosamente",
            result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
        return;
    }
});
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipes_service_1.default.getAll();
        if (!result) {
            res.status(400).json({ message: `Error al obtener las recetas.` });
            return;
        }
        res.status(200).json({
            message: "Recetas obtenidas exitosamente",
            result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
        return;
    }
});
const getAllpending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipes_service_1.default.getAllpending();
        if (!result) {
            res.status(400).json({ message: `Error al obtener las recetas.` });
            return;
        }
        res.status(200).json({
            message: "Recetas obtenidas exitosamente",
            result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
        return;
    }
});
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "El ID es requerido." });
            return;
        }
        const result = yield recipes_service_1.default.getById(id);
        if (!result) {
            res.status(400).json({ message: `Error al obtener la receta con el id ${id}.` });
            return;
        }
        if (result.recipeNotFound) {
            res.status(404).json({ message: `No se encontró la receta con el ID: ${id}` });
            return;
        }
        res.status(201).json({
            message: "Receta obtenida exitosamente",
            result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
        return;
    }
});
const getUserRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ message: "El ID es requerido." });
            return;
        }
        const result = yield recipes_service_1.default.getUserRecipes(userId);
        if (!result) {
            res.status(404).json({ message: `No se encontraron las receta del usuario con el ID: ${userId}` });
            return;
        }
        res.status(201).json({
            message: "Recetas obtenidas exitosamente",
            result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
        return;
    }
});
const editStatusById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!id) {
            res.status(400).json({ message: "El ID es requerido." });
            return;
        }
        const result = yield recipes_service_1.default.editStatusById(id, status);
        if (!result) {
            res.status(400).json({ message: `Error al obtener la receta con el id ${id}.` });
            return;
        }
        res.status(201).json({
            message: "Receta editada exitosamente",
            result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
        return;
    }
});
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "El ID es requerido." });
            return;
        }
        const result = yield recipes_service_1.default.deleteById(id);
        if (result.cloudinaryError) {
            res.status(404).json({ message: `Error al eliminar la imagen en cloudinary.` });
            return;
        }
        if (result.mongodbError) {
            res.status(404).json({ message: `Error al eliminar la receta en MongoDB.` });
            return;
        }
        res.status(201).json({
            message: "Receta eliminada exitosamente",
            result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
        return;
    }
});
const recipesController = {
    createRecipe,
    getAll,
    getAllpending,
    getById,
    getUserRecipes,
    editStatusById,
    deleteById
};
exports.default = recipesController;
//# sourceMappingURL=recipes.controller.js.map