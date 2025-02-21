"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = __importDefault(require("./categories.controller"));
const validateSchema_1 = require("../../middleware/validateSchema");
const categories_schema_1 = require("./categories.schema");
const authToken_1 = require("../../middleware/authToken");
const { createCategory, getAllCategories, updateCategory, deleteAllCategories, loadCategories } = categories_controller_1.default;
const categoriesRoutes = express_1.default.Router();
categoriesRoutes.post("/", authToken_1.authentication, (0, validateSchema_1.validateSchema)(categories_schema_1.categorySchema), createCategory);
categoriesRoutes.get("/", getAllCategories);
categoriesRoutes.put("/:id", authToken_1.authentication, updateCategory);
categoriesRoutes.post("/loadCategories", loadCategories);
categoriesRoutes.delete("/", authToken_1.authentication, deleteAllCategories);
// ratesRoutes.delete("/:id", deleteRate);
exports.default = categoriesRoutes;
//# sourceMappingURL=categories.routes.js.map