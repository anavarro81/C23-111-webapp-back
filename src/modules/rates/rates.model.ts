import { Schema, model } from "mongoose";

const RateSchema = new Schema({
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
  reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true }

},
{
    timestamps: true,
});

const RateModel = model("Rate", RateSchema);

export default RateModel;


