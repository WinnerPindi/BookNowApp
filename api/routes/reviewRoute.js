import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {
    createReview,
    deleteReview,
    getReview,
    getReviews,
    updateReview,
    getReviewsByUser,
    getReviewsByRoom
} from "../controllers/reviewController.js"

const router = express.Router();
// Créer une Review
router.post("/", verifyUser, createReview); // Utilise `verifyUser` pour s'assurer que seuls les utilisateurs authentifiés peuvent créer une Review
// Mettre à jour une Review
router.put("/:id", verifyUser, updateReview); // Vous pourriez vouloir vérifier si l'utilisateur est le créateur de la Review ou un admin
// Supprimer une Review
router.delete("/:id", verifyUser, verifyAdmin, deleteReview); // Assure que seul un admin peut supprimer une Review
// Récupérer une Review par son ID
router.get("/me", verifyUser, getReview);
// Récupérer toutes les Reviews
router.get("/", verifyAdmin, getReviews); // Limite cette opération aux administrateurs
//Recurer les com d'une chambre 
router.get("/room/:roomId", getReviewsByRoom);


router.get('/user/:userId', verifyUser, getReviewsByUser);
export default router;