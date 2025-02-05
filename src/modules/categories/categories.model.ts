import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
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
  author: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['active', 'inactive', 'archived']
},

},
{
    timestamps: true,
});

const CategoryModel = model("Category", CategorySchema);

export default CategoryModel;
