"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLogin = exports.authRegister = void 0;
const auth_service_1 = require("./auth.service");
const dotenv_config_1 = require("../../config/dotenv.config");
const bcrypt_1 = require("bcrypt");
const authToken_1 = require("../../middleware/authToken");
const authRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const isUserRegistered = yield (0, auth_service_1.findUserByEmail)(email);
        if (isUserRegistered)
            res.status(400).json({ message: "Este usuario ya esta registrado" });
        const encryptPassword = yield (0, bcrypt_1.hash)(password, 10);
        const newUser = yield (0, auth_service_1.createdUser)({ name, email, password: encryptPassword });
        const payload = { name, email, password };
        if (!dotenv_config_1.JWT_SECRET)
            throw new Error("No se ha definido un JWT_SECRET");
        const token = (0, authToken_1.generateToken)(payload, dotenv_config_1.JWT_SECRET);
        res.status(201).json({
            message: "usuario registrado",
            user: newUser,
            token: token
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        console.error(error);
        res.status(400).json({
            message: errorMessage,
        });
    }
});
exports.authRegister = authRegister;
const authLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const isUserRegistered = yield (0, auth_service_1.findUserByEmail)(body.email);
        if (!isUserRegistered)
            res.status(400).json({ message: "Este correo no está registrado" });
        else {
            const isValidPassword = yield (0, bcrypt_1.compare)(body.password, isUserRegistered === null || isUserRegistered === void 0 ? void 0 : isUserRegistered.password);
            if (!isValidPassword)
                res.status(400).json({ message: "Las contraseñas no coinciden" });
            const payload = body;
            if (!dotenv_config_1.JWT_SECRET)
                throw new Error("No se ha definido un JWT_SECRET");
            const token = (0, authToken_1.generateToken)(payload, dotenv_config_1.JWT_SECRET);
            res.status(201).json({
                message: "usuario logueado",
                user: isUserRegistered,
                token: token
            });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        console.error(error);
        res.status(400).json({
            message: errorMessage,
        });
    }
});
exports.authLogin = authLogin;
//# sourceMappingURL=auth.controller.js.map