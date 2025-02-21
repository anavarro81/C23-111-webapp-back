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
Object.defineProperty(exports, "__esModule", { value: true });
exports.favouriteRecipe = exports.getUserProfile = void 0;
const users_service_1 = require("./users.service");
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "El ID es requerido." });
        return;
    }
    try {
        const findedUser = yield (0, users_service_1.getUserById)(id);
        res.status(201).json({
            message: "Receta obtenida exitosamente",
            user: findedUser,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        res.status(500).json({
            message: errorMessage,
        });
    }
});
exports.getUserProfile = getUserProfile;
const favouriteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const toggleRecipe = yield (0, users_service_1.preferredRecipe)(userId, recipeId, type);
        res.status(201).json({
            message: `Receta se ${type === "add" ? "agrego a" : "elimino de"} favoritos del usuario`,
            recipe: toggleRecipe,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        res.status(500).json({
            message: errorMessage,
        });
    }
});
exports.favouriteRecipe = favouriteRecipe;
//# sourceMappingURL=users.controller.js.map