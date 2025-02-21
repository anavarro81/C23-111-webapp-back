"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: "El campo 'name' debe ser texto.",
        required_error: "El campo 'name' es requerido."
    })
        .min(5, { message: "El nombre debe tener al menos 5 caracteres." }),
    email: zod_1.z.string({
        invalid_type_error: "El campo 'email' debe ser texto.",
        required_error: "El campo 'email' es requerido."
    })
        .email({ message: "El campo 'email' debe ser un correo electrónico válido." }),
    password: zod_1.z.string({
        invalid_type_error: "El campo 'password' debe ser texto.",
        required_error: "El campo 'password' es requerido."
    })
        .regex(/[a-zA-Z]/, { message: "La contraseña debe contener al menos una letra." })
        .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
        .regex(/[@$!%*?&]/, { message: "La contraseña debe contener al menos un carácter especial. (@$!%*?&)" }),
}).strict();
exports.loginSchema = exports.registerSchema.omit({ name: true }).strict();
//# sourceMappingURL=auth.schema.js.map