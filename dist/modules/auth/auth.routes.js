"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_schema_1 = require("./auth.schema");
const validateSchema_1 = require("../../middleware/validateSchema");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post("/register", (0, validateSchema_1.validateSchema)(auth_schema_1.registerSchema), auth_controller_1.authRegister);
exports.authRoutes.post("/login", (0, validateSchema_1.validateSchema)(auth_schema_1.loginSchema), auth_controller_1.authLogin);
//# sourceMappingURL=auth.routes.js.map