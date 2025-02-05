import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "./dotenv.config";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<{ secure_url: string, resource_type: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        resource_type: 'auto',
        folder, 
        public_id: Date.now().toString(),
      },
      (error, result) => {
        if (error) {
          reject(new Error('Error al subir el archivo a Cloudinary: ' + error.message));
        }
        if (result) {
          resolve(result);
        } else {
          reject(new Error('El resultado de la subida es undefined'));
        }
      }
    );

    uploadStream.end(buffer);
  });
};

const deleteToCloudinary = async (url: string): Promise<boolean> => {
  try {
    const regex = /upload\/(?:v\d+\/)?(.+)\./;
    const match = url.match(regex);

    if (!match || !match[1]) {
      console.error("No se pudo extraer el public_id del URL proporcionado.");
      return false;
    }

    const publicId = match[1];

    const imgDeleted = await cloudinary.uploader.destroy(publicId);

    if (imgDeleted.result !== "ok") {
      console.error(`Error al eliminar la imagen: ${imgDeleted.result}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Ocurrió un error al intentar eliminar la imagen de Cloudinary:", error);
    return false;
  }
};

export { cloudinary, uploadToCloudinary, deleteToCloudinary };

