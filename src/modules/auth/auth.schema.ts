import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string({
    invalid_type_error: "El campo 'name' debe ser texto.",
    required_error: "El campo 'name' es requerido."
  })
    .min(5, { message: "El nombre debe tener al menos 5 caracteres." }),
  email: z.string({
    invalid_type_error: "El campo 'email' debe ser texto.",
    required_error: "El campo 'email' es requerido."
  })
    .email({ message: "El campo 'email' debe ser un correo electrónico válido." }),
  password: z.string({
    invalid_type_error: "El campo 'password' debe ser texto.",
    required_error: "El campo 'password' es requerido."
  })
    .regex(/[a-zA-Z]/, { message: "La contraseña debe contener al menos una letra." })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    .regex(/[@$!%*?&]/, { message: "La contraseña debe contener al menos un carácter especial. (@$!%*?&)" }),
}).strict();

export const loginSchema = registerSchema.omit({ name: true }).strict();
