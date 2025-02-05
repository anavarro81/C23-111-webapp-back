import express from "express";
import cors from 'cors';
import { serverRoutes } from "./mainRoutes";
import { optionCors } from "./config/cors.config";
import { PORT, MONGO_URI, HOST } from "./config/dotenv.config";
import mongoose from "mongoose";
import logger from "morgan";

// Si no está definid BD, lanzar error. Mongoose no admite undefined como valor de conexión
if (!MONGO_URI) {
  throw new Error("URI de conexion a MongoBD no definida");
}

const app = express();

app.use(cors(optionCors)); // Config de cors
app.use(express.json());
app.disable("x-powered-by"); // Evita un tipo de cyberataque 
app.use(logger("dev")); // Logger de solicitudes HTTP

app.use(serverRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionandooo00 correctamente!!!!!!!!')
})

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada :/')
})

mongoose.connect(MONGO_URI,{
}).then ( () => console.log('Conexion correcta a MongoDB'))
.catch( (error) => {
  console.log('Error al conectar a MongoDB', error.message);
  process.exit(1);
})

app.listen(PORT,() => {
  console.log(`Server on port ${PORT}`)
})
