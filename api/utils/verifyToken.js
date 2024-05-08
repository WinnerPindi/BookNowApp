import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import { promisify } from "util";
import UserModel from "../models/UserModel.js";

// Middleware pour vérifier si le token JWT est présent et valide
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Récupère le token du cookie
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(401, "Token is not valid!"));
    }
    req.user = user;// Stocke les infos de l'utilisateur dans l'objet requête
    console.log(req.user);
    next();
  });
};


// Middleware pour vérifier l'identité de l'utilisateur
export const verifyUser = async (req, res, next) => {
  let token;
  // Recherche d'un token dans les en-têtes de la requête ou dans les cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extraction du token de l'en-tête d'autorisation
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.access_token) {
    // Extraction du token du cookie si non trouvé dans l'en-tête
    token = req.cookies.access_token;
  }

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  // 2) Verification du token pour s'assurer qu'il est valide et n'a pas expiré

  let decoded = await promisify(jwt.verify)(token, process.env.JWT);
  //console.log(decoded);

  // 3) Récupération de l'utilisateur à partir de l'ID contenu dans le token
  const freshUser = await UserModel.findById(decoded.id);

  if (!freshUser) {
    // Si aucun utilisateur correspondant n'est trouvé
    return next(createError(401, "You are not authenticated!"));
  }

  // 4) Vérifier si le mot de passe a changé après la création du token
  req.user = freshUser;
  next();
};


// Middleware pour vérifier si l'utilisateur est un administrateur
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // Après que verifyToken ait appelé next(), ce code est exécuté.
    if (req.user && req.user.isAdmin) {
      next(); // L'utilisateur est authentifié et autorisé, continuer.
    } else {
      next(createError(403, "You are not authorized")); // L'utilisateur n'est pas autorisé.
    }
  });
};

export const updateUserProfileImage = async (req, res, next) => {
  try {
    // Vérifier si une image a été téléchargée
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    // Récupérer l'URL de l'image téléchargée
    const imageUrl = req.file.path;

    // Mettre à jour l'utilisateur avec l'URL de l'image
    req.user.profileImage = imageUrl;
    await req.user.save();

    // Répondre avec succès
    res
      .status(200)
      .json({ message: "Profile image updated successfully", imageUrl });
  } catch (error) {
    // Gérer les erreurs
    console.error("Error updating profile image:", error);
    next(error);
  }
};


// Middleware pour authentifier un token
export const authenticateToken = async (request, response, next) => {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return response.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      console.log("log: ", user);
      return response.sendStatus(403); // Si token invalide
    }
    console.log("Utilisateur: ", user);
    request.user = user;// Stocke l'utilisateur dans la requête
    next();
  });
};
