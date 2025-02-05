import { Router } from "express";
import { authRoutes } from "./modules/auth/auth.routes";
import recipesRoutes from "./modules/recipes/recipes.routes";
import ratesRoutes from "./modules/rates/rates.routes";
import { usersRoutes } from "./modules/users/users.routes";
import categoriesRoutes from "./modules/categories/categories.routes";
import { authentication } from "./middleware/authToken";

export const serverRoutes = Router();

serverRoutes.use("/auth", authRoutes);
serverRoutes.use("/recipes", recipesRoutes);
serverRoutes.use("/user", authentication, usersRoutes);
serverRoutes.use("/rates", ratesRoutes);
serverRoutes.use("/categories", categoriesRoutes);
