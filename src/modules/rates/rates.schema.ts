import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const rateSchema = z.object({
    rating: z.number({
    invalid_type_error: "El campo rating debe ser un número.",
    required_error: "El campo 'rating es requerido."
  })
    .min(1, { message: "El valor debe ser al menos 1." })
    .max(5, { message: "El valor no puede ser mayor a 5." }),

    comment: z.string({
        invalid_type_error: "El campo comment debe ser texto."
        //required_error: "El obligatorio comentar la receta."
    })
    .max(100, { message: "El comentario no puede tener más de 100 caracteres." })
    .optional(),  // Comentario opcional
    

    reviewer: z.string({
        invalid_type_error: "El campo reviewer debe ser un ObjectId válido.",
        required_error: "El campo reviewer es requerido."
      }).regex(objectIdRegex, { message: "El campo reviewer debe ser un ObjectId válido." }),

    recipe: z.string({
        invalid_type_error: "El campo recipe debe ser un ObjectId válido.",
        required_error: "El campo recipe es requerido."
      }).regex(objectIdRegex, { message: "El campo recipe debe ser un ObjectId válido."
    })  


}).strict();