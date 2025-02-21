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
const categories_model_1 = __importDefault(require("./categories.model"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = new categories_model_1.default(req.body);
        const createdCategory = yield newCategory.save();
        res.status(201).json(createdCategory);
    }
    catch (error) {
        // Compureba si el error devuelve es una instancia de Error
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_model_1.default.find();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categories_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const deleteAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categories_model_1.default.deleteMany();
        res.status(200).json({ message: "All categories deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const loadCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insertedCategories = yield categories_model_1.default.insertMany(req.body);
        if (insertedCategories) {
            res.status(201).json(insertedCategories);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = { createCategory, getAllCategories, updateCategory, deleteAllCategories, loadCategories };
//# sourceMappingURL=categories.controller.js.map