"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipes_controller_1 = __importDefault(require("./recipes.controller"));
const multer_config_1 = require("../../config/multer.config");
const validateSchema_1 = require("../../middleware/validateSchema");
const recipes_schema_1 = require("./recipes.schema");
const authToken_1 = require("../../middleware/authToken");
const recipesRoutes = express_1.default.Router();
recipesRoutes.post("/", authToken_1.authentication, (0, multer_config_1.uploader)('file'), (0, validateSchema_1.validateSchema)(recipes_schema_1.recipeSchema), recipes_controller_1.default.createRecipe);
recipesRoutes.get("/", recipes_controller_1.default.getAll);
recipesRoutes.get("/pending", authToken_1.authentication, recipes_controller_1.default.getAllpending);
recipesRoutes.get("/:id", recipes_controller_1.default.getById);
recipesRoutes.get("/user/:userId", recipes_controller_1.default.getUserRecipes);
recipesRoutes.patch("/:id", authToken_1.authentication, (0, validateSchema_1.validateSchema)(recipes_schema_1.statusStatusSchema), recipes_controller_1.default.editStatusById);
recipesRoutes.delete("/:id", authToken_1.authentication, recipes_controller_1.default.deleteById);
exports.default = recipesRoutes;
//# sourceMappingURL=recipes.routes.js.map