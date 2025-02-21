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
const mongoose_1 = __importDefault(require("mongoose"));
const users_model_1 = __importDefault(require("../modules/users/users.model"));
const dotenv_config_1 = require("../config/dotenv.config");
const bcrypt_1 = require("bcrypt");
const fs_1 = __importDefault(require("fs"));
const param = process.argv[2];
if (!dotenv_config_1.MONGO_URI_TEST) {
    throw new Error("URI de conexion a MongoBD no definida");
}
mongoose_1.default.connect(dotenv_config_1.MONGO_URI_TEST, {}).then(() => console.log('Conexion correcta a MongoDB'))
    .catch((error) => {
    console.log('Error al conectar a MongoDB', error.message);
    process.exit(1);
});
const loadUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = JSON.parse(fs_1.default.readFileSync(`${__dirname}\\data\\users.json`, 'utf-8'));
    // console.log(users);
    try {
        // Encriptar contraseñas
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const encryptPassword = yield (0, bcrypt_1.hash)(user.password, 10);
            users[i].password = encryptPassword;
        }
        yield users_model_1.default.create(users);
        console.log('Usuarios creados correctamente');
    }
    catch (error) {
        console.log(`Error cargando los datos: ${error}`);
        process.exit();
    }
});
const loadCategories = () => __awaiter(void 0, void 0, void 0, function* () {
});
const start = (param) => __awaiter(void 0, void 0, void 0, function* () {
    if (param === 'loadAll') {
        yield loadUsers();
    }
});
start(param);
//# sourceMappingURL=seedDatabase.js.map