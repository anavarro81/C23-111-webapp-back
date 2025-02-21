"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mainRoutes_1 = require("./mainRoutes");
const cors_config_1 = require("./config/cors.config");
const dotenv_config_1 = require("./config/dotenv.config");
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
// Si no está definid BD, lanzar error. Mongoose no admite undefined como valor de conexión
if (!dotenv_config_1.MONGO_URI) {
    throw new Error("URI de conexion a MongoBD no definida");
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_config_1.optionCors)); // Config de cors
app.use(express_1.default.json());
app.disable("x-powered-by"); // Evita un tipo de cyberataque 
app.use((0, morgan_1.default)("dev")); // Logger de solicitudes HTTP
app.use(mainRoutes_1.serverRoutes);
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente!!!!!!!!');
});
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada :/');
});
mongoose_1.default.connect(dotenv_config_1.MONGO_URI, {}).then(() => console.log('Conexion correcta a MongoDB'))
    .catch((error) => {
    console.log('Error al conectar a MongoDB', error.message);
    process.exit(1);
});
app.listen(dotenv_config_1.PORT, () => {
    console.log(`Server on port ${dotenv_config_1.PORT}`);
});
//# sourceMappingURL=server.js.map