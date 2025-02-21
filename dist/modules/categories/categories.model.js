"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Es obligatorio el nombre de la categoria'],
        minlength: [3, 'El nombre de la categoria debe tener al menos 3 caracteres'],
        maxLength: [50, 'El nombre de la categoria no puede superar los 50 caracteres']
    },
    description: {
        type: String,
        required: [true, 'Es obligatoria la descripcion de la categoria'],
        maxLength: [100, 'El nombre de la categoria no puede superar los 100 caracteres']
    },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users', required: true },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'archived']
    },
}, {
    timestamps: true,
});
const CategoryModel = (0, mongoose_1.model)("Category", CategorySchema);
exports.default = CategoryModel;
//# sourceMappingURL=categories.model.js.map