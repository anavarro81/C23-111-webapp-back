import * as dotenv from "dotenv";

dotenv.config();

export const PORT = parseInt(process.env.PORT ?? '3003', 10); // El 10 es el formato de conversión (Decimal)
export const HOST = process.env.HOST ?? 'localhost';
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const MONGO_URI = process.env.MONGO_URI;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY ;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const MONGO_URI_TEST = process.env.MONGO_URI_TEST;
export const JWT_SECRET = process.env.JWT_SECRET;
