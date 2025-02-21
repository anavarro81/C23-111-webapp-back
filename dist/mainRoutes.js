"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./modules/auth/auth.routes");
const recipes_routes_1 = __importDefault(require("./modules/recipes/recipes.routes"));
const rates_routes_1 = __importDefault(require("./modules/rates/rates.routes"));
const users_routes_1 = require("./modules/users/users.routes");
const categories_routes_1 = __importDefault(require("./modules/categories/categories.routes"));
const authToken_1 = require("./middleware/authToken");
exports.serverRoutes = (0, express_1.Router)();
exports.serverRoutes.use("/auth", auth_routes_1.authRoutes);
exports.serverRoutes.use("/recipes", recipes_routes_1.default);
exports.serverRoutes.use("/user", authToken_1.authentication, users_routes_1.usersRoutes);
exports.serverRoutes.use("/rates", rates_routes_1.default);
exports.serverRoutes.use("/categories", categories_routes_1.default);
//# sourceMappingURL=mainRoutes.js.map