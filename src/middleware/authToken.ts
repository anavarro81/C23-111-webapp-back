import { sign, verify } from "jsonwebtoken";
import { User } from "../modules/users/users.model";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config/dotenv.config";

export const generateToken = (body: Partial<User>, secret: string) => {
  return sign(body , secret, { expiresIn: '1h' })
}

export const authentication = (req: Request, res: Response, next: NextFunction) => {
   // Obtener el token de las cabeceras (Authorization: Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Token no proporcionado" });
    return;
  }

  if (!JWT_SECRET) throw new Error("No se ha definido un JWT_SECRET");
  verify(token, JWT_SECRET, (error) => {
    if (error) {
      res.status(403).json({ message: "Token inválido" })
      return;
    }
    next();
  })
}