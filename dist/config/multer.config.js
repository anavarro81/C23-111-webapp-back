"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importStar(require("multer"));
const storage = multer_1.default.memoryStorage();
const uploader = (fieldName) => {
    const upload = (0, multer_1.default)({
        storage,
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new Error('Tipo de archivo no permitido'));
            }
            cb(null, true);
        },
    }).single(fieldName);
    return (req, res, next) => {
        upload(req, res, (err) => {
            if (err instanceof multer_1.MulterError) {
                switch (err.code) {
                    case 'LIMIT_FILE_SIZE':
                        return res.status(400).json({ error: 'El archivo es demasiado grande. Máximo 5MB permitido.' });
                    case 'LIMIT_FILE_COUNT':
                        return res.status(400).json({ error: 'Se excedió el número máximo de archivos permitidos.' });
                    case 'LIMIT_UNEXPECTED_FILE':
                        return res.status(400).json({ error: 'Archivo inesperado encontrado.' });
                    default:
                        return res.status(400).json({ error: `Error de subida: ${err.message}` });
                }
            }
            else if (err) {
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    };
};
exports.uploader = uploader;
//# sourceMappingURL=multer.config.js.map