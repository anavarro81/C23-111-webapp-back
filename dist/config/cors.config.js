"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionCors = void 0;
const optionCors = {
    // Si van a usar el front precario pongan un ("*") en el orogin. Ej: origin: "*".
    // origin: CORS_ORIGIN,
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
        "Access-Control-Allow-Origin",
        "Content-Type",
        "Authorization",
    ],
};
exports.optionCors = optionCors;
//# sourceMappingURL=cors.config.js.map