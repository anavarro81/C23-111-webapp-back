import express from "express";
import categoriesController from "./categories.controller"
import { validateSchema } from "../../middleware/validateSchema";
import { categorySchema } from "./categories.schema";
import { authentication } from "../../middleware/authToken";
const { createCategory, getAllCategories, updateCategory, deleteAllCategories, loadCategories } = categoriesController;

const categoriesRoutes = express.Router();

categoriesRoutes.post("/", authentication, validateSchema(categorySchema), createCategory);
categoriesRoutes.get("/",  getAllCategories);
categoriesRoutes.put("/:id", authentication, updateCategory);
categoriesRoutes.post("/loadCategories", loadCategories);
categoriesRoutes.delete("/", authentication, deleteAllCategories);

// ratesRoutes.delete("/:id", deleteRate);

export default categoriesRoutes;