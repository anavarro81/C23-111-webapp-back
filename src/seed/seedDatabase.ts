import mongoose from "mongoose";
import UserModel, { User } from "../modules/users/users.model";
import CategoryModel from "../modules/categories/categories.model";
import { HOST, PORT, MONGO_URI_TEST } from "../config/dotenv.config";
import { compare, hash } from "bcrypt";
import fs from 'fs';

const param = process.argv[2];

if (!MONGO_URI_TEST) {
    throw new Error("URI de conexion a MongoBD no definida");
}

mongoose.connect(MONGO_URI_TEST,{
}).then ( () => console.log('Conexion correcta a MongoDB'))
.catch( (error) => {
  console.log('Error al conectar a MongoDB', error.message);
  process.exit(1);
})

const loadUsers = async () => {
    const users = JSON.parse(fs.readFileSync(`${__dirname}\\data\\users.json`, 'utf-8'));
    // console.log(users);

    try {
        // Encriptar contraseñas
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const encryptPassword = await hash(user.password, 10);
            users[i].password = encryptPassword;
        }                       
        
        await UserModel.create(users);
        console.log('Usuarios creados correctamente');
        
    } catch (error) {
        console.log(`Error cargando los datos: ${error}`);
        process.exit();
    }
}

const loadCategories = async () => {
}    

const start = async (param: string) => {
    if (param === 'loadAll') {
        await loadUsers();
    }
}

start(param)