"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
exports.usersRoutes = (0, express_1.Router)();
exports.usersRoutes.get("/:id", users_controller_1.getUserProfile);
exports.usersRoutes.put("/favourites", users_controller_1.favouriteRecipe);
//# sourceMappingURL=users.routes.js.map