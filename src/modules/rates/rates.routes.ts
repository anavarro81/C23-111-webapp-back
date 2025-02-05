import express from "express";
import ratesController from "./rates.controller"
import { validateSchema } from "../../middleware/validateSchema";
import { rateSchema } from "./rates.schema";
import { authentication } from "../../middleware/authToken";
const { createRate, deleteRate, getRatesByRecipe, deleteRatesByRecipeID} = ratesController;

const ratesRoutes = express.Router();

ratesRoutes.post("/", authentication, validateSchema(rateSchema), createRate);
ratesRoutes.delete("/:id", authentication, deleteRate);
ratesRoutes.get("/:id", getRatesByRecipe);
ratesRoutes.delete("/recipe/:id", authentication, deleteRatesByRecipeID);

export default ratesRoutes;

