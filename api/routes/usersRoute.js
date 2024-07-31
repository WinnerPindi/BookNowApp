import express from "express";
import { deleteUser, getUser, getUsers, updateUser, updateUserProfileImage } from "../controllers/userController.js";
import { verifyToken, verifyUser, verifyAdmin , authenticateToken} from "../utils/verifyToken.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// UPDATE un utilisateur
router.put("/:id", verifyUser, updateUser);
// DELETE un utilisateur
router.delete("/:id", verifyUser, deleteUser);
// GET un utilisateur
router.get("/:id", verifyUser, getUser);
// GET tous les utilisateurs
router.get("/", verifyAdmin, getUsers);
// Mettre à jour l'image de profil de l'utilisateur
router.put("/profileImage/:id", authenticateToken, upload.single("profileImage"), updateUserProfileImage);

export default router;
