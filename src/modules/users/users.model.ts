import { Schema, model } from "mongoose";
import { IRecipeSchema, RecipeSchema } from "../recipes/recipes.model";

export interface User {
  name: string;
  email: string;
  password: string;
  rol: "user" | "admin";
  image?: string;
  favouritesRecipes: IRecipeSchema[];
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['user', 'admin'], default: 'user' },
  image: {type: String },
  favouritesRecipes: {type: [RecipeSchema], required: true},
  createdAt: { type: Date, default: Date.now }
});

const UserModel = model("User", UserSchema, "users");

export default UserModel;
