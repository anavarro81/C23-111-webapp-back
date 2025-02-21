"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipes_model_1 = require("../recipes/recipes.model");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['user', 'admin'], default: 'user' },
    image: { type: String },
    favouritesRecipes: { type: [recipes_model_1.RecipeSchema], required: true },
    createdAt: { type: Date, default: Date.now }
});
const UserModel = (0, mongoose_1.model)("User", UserSchema, "users");
exports.default = UserModel;
//# sourceMappingURL=users.model.js.map