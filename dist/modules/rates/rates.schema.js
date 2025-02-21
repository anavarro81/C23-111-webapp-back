"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateSchema = void 0;
const zod_1 = require("zod");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
exports.rateSchema = zod_1.z.object({
    rating: zod_1.z.number({
        invalid_type_error: "El campo rating debe ser un número.",
        required_error: "El campo 'rating es requerido."
    })
        .min(1, { message: "El valor debe ser al menos 1." })
        .max(5, { message: "El valor no puede ser mayor a 5." }),
    comment: zod_1.z.string({
        invalid_type_error: "El campo comment debe ser texto."
        //required_error: "El obligatorio comentar la receta."
    })
        .max(100, { message: "El comentario no puede tener más de 100 caracteres." })
        .optional(), // Comentario opcional
    reviewer: zod_1.z.string({
        invalid_type_error: "El campo reviewer debe ser un ObjectId válido.",
        required_error: "El campo reviewer es requerido."
    }).regex(objectIdRegex, { message: "El campo reviewer debe ser un ObjectId válido." }),
    recipe: zod_1.z.string({
        invalid_type_error: "El campo recipe debe ser un ObjectId válido.",
        required_error: "El campo recipe es requerido."
    }).regex(objectIdRegex, { message: "El campo recipe debe ser un ObjectId válido."
    })
}).strict();
//# sourceMappingURL=rates.schema.js.map