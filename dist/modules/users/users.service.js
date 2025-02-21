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
exports.preferredRecipe = exports.getUserById = void 0;
const recipes_model_1 = __importDefault(require("../recipes/recipes.model"));
const users_model_1 = __importDefault(require("./users.model"));
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRecipes = yield recipes_model_1.default.find({ userId: id });
        const user = yield users_model_1.default.findById(id);
        return Object.assign(Object.assign({}, user === null || user === void 0 ? void 0 : user.toObject()), { myRecipes: userRecipes });
    }
    catch (error) {
        throw new Error(`Error al obtener el usuario: ${error}`);
    }
});
exports.getUserById = getUserById;
const preferredRecipe = (userId, recipeId, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findRecipe = yield recipes_model_1.default.findById(recipeId);
        if (!findRecipe)
            throw new Error("La receta no existe");
        const updateUser = yield users_model_1.default.findByIdAndUpdate(userId, type === "add"
            ? { $addToSet: { favouritesRecipes: findRecipe } }
            : { $pull: { favouritesRecipes: { _id: recipeId } } }, { new: true });
        if (!updateUser)
            new Error("El usuario no fue encontrado");
        const isAdded = updateUser === null || updateUser === void 0 ? void 0 : updateUser.favouritesRecipes.some(recipe => recipe._id.toString() === recipeId);
        if (!isAdded)
            new Error(`No se ${type === "add" ? "agrego la" : "elimino de"} receta a favoritos del usuario`);
        return findRecipe;
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
exports.preferredRecipe = preferredRecipe;
//# sourceMappingURL=users.service.js.map