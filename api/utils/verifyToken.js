import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import {promisify} from "util";
import UserModel from "../models/UserModel.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(401, "Token is not valid!"));
    }
    req.user = user;
    console.log(req.user);
    next();
  });
};

export const verifyUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }else if(req.cookies.access_token){
    token = req.cookies.access_token;
  }

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  // 2) Verification du token

  let decoded = await promisify(jwt.verify)(token, process.env.JWT);
  //console.log(decoded);
  // 3) Vérifier si l'utilisateur existe
  const freshUser = await UserModel.findById(decoded.id);

  if (!freshUser) {
    return next(createError(401, "You are not authenticated!"));
  }

  // 4) Vérifier si le mot de passe a changé après la création du token

  req.user = freshUser;
  next();
  //verifyToken(req, res, () => {
  //console.log(req.user);
  // Après que verifyToken ait appelé next(), ce code est exécuté.
  //if (req.user.id === req.params.id || req.user.isAdmin) {
  // next(); // L'utilisateur est authentifié et autorisé, continuer.
  // } else {
  //next(createError(403, "You are not authorized")); // L'utilisateur n'est pas autorisé.
  //}
  //});
};

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
