"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rates_controller_1 = __importDefault(require("./rates.controller"));
const validateSchema_1 = require("../../middleware/validateSchema");
const rates_schema_1 = require("./rates.schema");
const authToken_1 = require("../../middleware/authToken");
const { createRate, deleteRate, getRatesByRecipe, deleteRatesByRecipeID } = rates_controller_1.default;
const ratesRoutes = express_1.default.Router();
ratesRoutes.post("/", authToken_1.authentication, (0, validateSchema_1.validateSchema)(rates_schema_1.rateSchema), createRate);
ratesRoutes.delete("/:id", authToken_1.authentication, deleteRate);
ratesRoutes.get("/:id", getRatesByRecipe);
ratesRoutes.delete("/recipe/:id", authToken_1.authentication, deleteRatesByRecipeID);
exports.default = ratesRoutes;
//# sourceMappingURL=rates.routes.js.map