"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RecipeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: [String], required: true },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    image: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    rateAverage: { type: Number, default: 0, min: 0, max: 5 },
    totalRates: { type: Number, default: 0 },
    userId: { type: String },
    createdAt: { type: Date, default: Date.now },
});
const RecipeModel = (0, mongoose_1.model)("Recipe", exports.RecipeSchema);
exports.default = RecipeModel;
//# sourceMappingURL=recipes.model.js.map