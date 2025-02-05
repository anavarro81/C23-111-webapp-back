import { Request, Response } from "express";
import { createdUser, findUserByEmail } from "./auth.service";
import { JWT_SECRET } from "../../config/dotenv.config";
import { compare, hash } from "bcrypt";
import { generateToken } from "../../middleware/authToken";

export const authRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const isUserRegistered = await findUserByEmail(email);
    if (isUserRegistered) res.status(400).json({message: "Este usuario ya esta registrado"});

    const encryptPassword = await hash(password, 10);
    const newUser = await createdUser({name, email, password: encryptPassword });
    
    const payload = {name, email, password};
    if (!JWT_SECRET) throw new Error("No se ha definido un JWT_SECRET");
    const token = generateToken(payload, JWT_SECRET);

    res.status(201).json({
      message: "usuario registrado",
      user: newUser,
      token: token
    })

  } catch(error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    console.error(error);
    res.status(400).json({
      message: errorMessage,
    });
  }
};

export const authLogin = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const isUserRegistered = await findUserByEmail(body.email);
    if (!isUserRegistered) res.status(400).json({message: "Este correo no está registrado"});
    else {
      const isValidPassword = await compare(body.password, isUserRegistered?.password);
      if (!isValidPassword) res.status(400).json({message: "Las contraseñas no coinciden"});

      const payload = body;
      if (!JWT_SECRET) throw new Error("No se ha definido un JWT_SECRET");
      const token = generateToken(payload, JWT_SECRET);

      res.status(201).json({
        message: "usuario logueado",
        user: isUserRegistered,
        token: token
      })
    }

  } catch(error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    console.error(error);
    res.status(400).json({
      message: errorMessage,
    });   
  }
};


