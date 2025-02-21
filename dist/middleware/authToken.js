"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_config_1 = require("../config/dotenv.config");
const generateToken = (body, secret) => {
    return (0, jsonwebtoken_1.sign)(body, secret, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const authentication = (req, res, next) => {
    var _a;
    // Obtener el token de las cabeceras (Authorization: Bearer <token>)
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado" });
        return;
    }
    if (!dotenv_config_1.JWT_SECRET)
        throw new Error("No se ha definido un JWT_SECRET");
    (0, jsonwebtoken_1.verify)(token, dotenv_config_1.JWT_SECRET, (error) => {
        if (error) {
            res.status(403).json({ message: "Token inválido" });
            return;
        }
        next();
    });
};
exports.authentication = authentication;
//# sourceMappingURL=authToken.js.map