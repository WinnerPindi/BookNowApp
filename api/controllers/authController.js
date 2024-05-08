import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    //hachage du mot de passe
    const hash = bcrypt.hashSync(req.body.password, salt);
    //On crée une instance d'utilisateur
    const newUser = new UserModel({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      password: hash,
    });
    // Sauvegarde de l'utilisateur
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    //Recherche d'un utilisateur par Email
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "Utilisateur non trouvé"));
    // On compare le mot de passe hacher avec celui entré
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //Mot de passe incorrect
    if (!isPasswordCorrect)
      return next(createError(404, "Wrong password or username"));

    //Génère un token JWT contenant ID de l'utilisateur 
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
      // Extrait le mot de passe et d'autres détails de l'utilisateur pour la réponse
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    //Envoie des details de l'utilisateur et le token 
    res.status(200).json({ userDetails: { ...otherDetails, token }, token });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res.cookie("access_token", "", { maxAge: 1 }); // Supprime le cookie en le définissant à une chaîne vide et en expirant immédiatement
  res.send("Déconnexion réussie"); // Envoie d'un message de déconnexion réussi
};
