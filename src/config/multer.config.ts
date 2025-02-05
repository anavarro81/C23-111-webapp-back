import { Request, Response, NextFunction } from 'express';
import multer, { StorageEngine, MulterError  } from 'multer';

const storage: StorageEngine = multer.memoryStorage();

export const uploader = (fieldName: string) => {
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Tipo de archivo no permitido')); 
      }
      cb(null, true);
    },
  }).single(fieldName);

  return (req: Request, res: Response, next: NextFunction): void => {
    upload(req, res, (err) => {
      if (err instanceof MulterError) {
        switch (err.code) {
          case 'LIMIT_FILE_SIZE':
            return res.status(400).json({ error: 'El archivo es demasiado grande. Máximo 5MB permitido.' });
          case 'LIMIT_FILE_COUNT':
            return res.status(400).json({ error: 'Se excedió el número máximo de archivos permitidos.' });
          case 'LIMIT_UNEXPECTED_FILE':
            return res.status(400).json({ error: 'Archivo inesperado encontrado.' });
          default:
            return res.status(400).json({ error: `Error de subida: ${err.message}` });
        }
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  };
};