"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaPartial = exports.validateSchema = void 0;
const zod_1 = require("zod");
const validateSchema = (schema) => (req, res, next) => {
    try {
        // const data = {...req.body, category: JSON.parse(req.body.category), steps: JSON.parse(req.body.steps), ingredients: JSON.parse(req.body.ingredients)}
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                errors: error.errors.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            });
        }
        else {
            next(error);
        }
    }
};
exports.validateSchema = validateSchema;
const validateSchemaPartial = (schema) => (req, res, next) => {
    try {
        schema.partial().parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                errors: error.errors.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            });
        }
        else {
            next(error);
        }
    }
};
exports.validateSchemaPartial = validateSchemaPartial;
//# sourceMappingURL=validateSchema.js.map