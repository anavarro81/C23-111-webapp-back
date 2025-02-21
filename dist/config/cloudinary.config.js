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
exports.deleteToCloudinary = exports.uploadToCloudinary = exports.cloudinary = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const dotenv_config_1 = require("./dotenv.config");
cloudinary_1.v2.config({
    cloud_name: dotenv_config_1.CLOUDINARY_CLOUD_NAME,
    api_key: dotenv_config_1.CLOUDINARY_API_KEY,
    api_secret: dotenv_config_1.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            resource_type: 'auto',
            folder,
            public_id: Date.now().toString(),
        }, (error, result) => {
            if (error) {
                reject(new Error('Error al subir el archivo a Cloudinary: ' + error.message));
            }
            if (result) {
                resolve(result);
            }
            else {
                reject(new Error('El resultado de la subida es undefined'));
            }
        });
        uploadStream.end(buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const deleteToCloudinary = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regex = /upload\/(?:v\d+\/)?(.+)\./;
        const match = url.match(regex);
        if (!match || !match[1]) {
            console.error("No se pudo extraer el public_id del URL proporcionado.");
            return false;
        }
        const publicId = match[1];
        const imgDeleted = yield cloudinary_1.v2.uploader.destroy(publicId);
        if (imgDeleted.result !== "ok") {
            console.error(`Error al eliminar la imagen: ${imgDeleted.result}`);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error("Ocurrió un error al intentar eliminar la imagen de Cloudinary:", error);
        return false;
    }
});
exports.deleteToCloudinary = deleteToCloudinary;
//# sourceMappingURL=cloudinary.config.js.map