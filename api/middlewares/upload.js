import multer from "multer";
import path from "path";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  // Définit le dossier de destination des fichiers téléchargés
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  // Définit le nom du fichier sauvegardé
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${Date.now()}.${ext}`);
  },
});
const fileFilter = (req, file, cb) => {
  // Vérifie si le type MIME du fichier est valide
  const isValid = !!MIME_TYPE_MAP[file.mimetype];
  let error = isValid ? null : new Error("Invalid mime type!");
  cb(error, isValid);
};
// Crée une instance de multer avec les configurations de stockage et de filtrage spécifiées
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
