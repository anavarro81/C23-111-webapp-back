import { Router } from "express";
import { favouriteRecipe, getUserProfile } from "./users.controller";

export const usersRoutes = Router();

usersRoutes.get("/:id", getUserProfile);
usersRoutes.put("/favourites", favouriteRecipe);