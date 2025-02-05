import { Router } from "express";
import { authLogin, authRegister } from "./auth.controller";
import { registerSchema, loginSchema} from "./auth.schema";
import { validateSchema } from "../../middleware/validateSchema";

export const authRoutes = Router();

authRoutes.post("/register", validateSchema(registerSchema), authRegister);
authRoutes.post("/login", validateSchema(loginSchema), authLogin);
