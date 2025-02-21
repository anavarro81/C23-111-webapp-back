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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.createdUser = void 0;
const users_model_1 = __importDefault(require("../users/users.model"));
const createdUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new users_model_1.default(user);
        yield newUser.save();
        return newUser;
    }
    catch (error) {
        throw new Error(`Error al crear usuario.`);
    }
});
exports.createdUser = createdUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findedUser = yield users_model_1.default.findOne({ email });
        return findedUser;
    }
    catch (error) {
        throw new Error(`Error al crear usuario.`);
    }
});
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=auth.service.js.map