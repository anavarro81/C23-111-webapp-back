import { z } from 'zod';



export const categorySchema = z.object({
    name: z.string({
    invalid_type_error: "El campo 'name' debe ser texto.",
    required_error: "Es obligatorio el nombre de la categoria."
  })
    .min(3, { message: "El valor debe ser al menos 3." })
    .max(50, { message: "El valor no puede ser mayor a 50." }),

    description: z.string({
        invalid_type_error: "El campo 'description' debe ser texto.",
        required_error: "Es obligatoria la descripcion de la categoria."
    })
    .min(10, { message: "La descripcion tiene que tener al menos 10 caracteres" })
    .max(50, { message: "La descripcion no puede tener más de 50 caracteres." }),
  
    author: z.string({
      invalid_type_error: "El campo 'author' debe ser un ID.",
      required_error: "Es obligatorio el autor de la categoria."
  }),
  // El estado 'archived' es para categorías que ya no se usan (historial)
  status: z.enum(['active', 'inactive', 'archived']),  


}).strict();