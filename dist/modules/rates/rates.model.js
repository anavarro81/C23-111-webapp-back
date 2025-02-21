"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RateSchema = new mongoose_1.Schema({
    rating: {
        type: Number,
        required: [true, 'Es obligatorio puntuar la receta'],
        min: [1, 'Minimo debe valorarse con 1 estrella'],
        max: [5, 'Maximo debe valorarse con 5 estrellas']
    },
    comment: {
        type: String,
        // required: [true, 'Es obligatorio comentar la receta'], 
        maxlength: [100, 'El comentario no puede superar los 100 caracteres']
    },
    reviewer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    recipe: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Recipe', required: true }
}, {
    timestamps: true,
});
const RateModel = (0, mongoose_1.model)("Rate", RateSchema);
exports.default = RateModel;
//# sourceMappingURL=rates.model.js.map