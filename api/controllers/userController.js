import UserModel from "../models/UserModel.js";


// Mettre à jour un utilisateur
export const updateUser = async (req, res, next) => {
  try {
     // Met à jour l'utilisateur avec les données fournies 
      const updateUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }// Retourne l'objet mis à jour
      );
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

// Récupérer un utilisateur spécifique
export const getUser = async (req, res, next) => {
  try {
    // Récupère un utilisateur par son ID
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


// Récupérer des utilisateurs
export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Mettre à jour l'image de profil de l'utilisateur
export const updateUserProfileImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded');
  }
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { profileImage: req.file.path },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

