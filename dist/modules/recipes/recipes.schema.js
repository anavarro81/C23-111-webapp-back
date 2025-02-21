"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusStatusSchema = exports.recipeSchema = void 0;
const zod_1 = require("zod");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
exports.recipeSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: "El campo 'name' debe ser texto.",
        required_error: "El campo 'name' es requerido."
    })
        .min(5, { message: "El nombre debe tener al menos 5 caracteres." })
        .max(50, { message: "El nombre no puede tener más de 50 caracteres." }),
    description: zod_1.z.string({
        invalid_type_error: "El campo 'description' debe ser texto.",
        required_error: "El campo 'description' es requerido."
    })
        .min(10, { message: "La descripción debe tener al menos 10 caracteres." })
        .max(100, { message: "La descripción no puede tener más de 100 caracteres." }),
    category: zod_1.z
        .array(zod_1.z.string({
        required_error: "Cada categoría debe ser texto.",
        invalid_type_error: "Cada categoría debe ser texto.",
    })
        .min(3, { message: "Cada categoría debe tener al menos 3 caracteres." })
        .max(15, { message: "Cada categoría no puede tener más de 15 caracteres." }))
        .min(1, { message: "Debe haber al menos una categoría." })
        .max(5, { message: "No se pueden tener más de 5 categorías." })
        .optional(),
    ingredients: zod_1.z.array(zod_1.z.string({
        invalid_type_error: "Cada ingrediente debe ser texto."
    })
        .min(3, { message: "Cada ingrediente debe tener al menos 3 caracteres." })
        .max(15, { message: "Cada ingrediente no puede tener más de 15 caracteres." }))
        .min(1, { message: "Debe haber al menos un ingrediente." })
        .max(50, { message: "No se pueden tener más de 50 ingredientes." }),
    steps: zod_1.z.array(zod_1.z.string({
        invalid_type_error: "Cada paso debe ser texto."
    })
        .min(5, { message: "Cada paso debe tener al menos 5 caracteres." })
        .max(250, { message: "Cada paso no puede tener más de 250 caracteres." }))
        .min(1, { message: "Debe haber al menos un paso." })
        .max(30, { message: "No se pueden tener más de 30 pasos." }),
    userId: zod_1.z.string({
        invalid_type_error: "El campo 'userId' debe ser de tipo string.",
        required_error: "El campo 'userId' es requerido.",
    })
        .nonempty({ message: "El userId no debe estar vacío." })
        .regex(objectIdRegex, { message: "El userId debe ser un ObjectId válido." })
}).strict();
exports.statusStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["pending", "approved", "rejected"])
}).strict();
//# sourceMappingURL=recipes.schema.js.map