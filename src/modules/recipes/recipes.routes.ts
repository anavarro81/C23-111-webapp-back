import express from "express";
import recipesController from "./recipes.controller";
import { uploader } from '../../config/multer.config';
import { validateSchema } from "../../middleware/validateSchema";
import { recipeSchema, statusStatusSchema } from "./recipes.schema";
import { authentication } from "../../middleware/authToken";

const recipesRoutes = express.Router();

recipesRoutes.post("/", authentication, uploader('file'), validateSchema(recipeSchema), recipesController.createRecipe);
recipesRoutes.get("/", recipesController.getAll);
recipesRoutes.get("/pending", authentication, recipesController.getAllpending);
recipesRoutes.get("/:id", recipesController.getById);
recipesRoutes.get("/user/:userId", recipesController.getUserRecipes);
recipesRoutes.patch("/:id", authentication, validateSchema(statusStatusSchema), recipesController.editStatusById);
recipesRoutes.delete("/:id", authentication, recipesController.deleteById);

export default recipesRoutes;
