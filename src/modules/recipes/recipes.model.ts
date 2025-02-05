import mongoose, { Schema, model, Document } from "mongoose";

export interface IRecipeSchema extends Document {
  name: string;
  description?: string;
  category: string[];
  ingredients: string[];
  steps: string[];
  image: string;
  status: "pending" | "approved" | "rejected"; 
  rateAverage: number;
  totalRates: number;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

export const RecipeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  category: { type: [String], required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  image: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  rateAverage: { type: Number, default: 0, min: 0, max: 5 },
  totalRates: { type: Number, default: 0 },
  userId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const RecipeModel = model("Recipe", RecipeSchema);

export default RecipeModel;
