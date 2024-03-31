import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"; // Assumant l'existence de ces middlewares
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
  getBookingsByUser
} from "../controllers/bookingController.js";

const router = express.Router();

// Créer une réservation
router.post("/", verifyUser, createBooking); // Utilise `verifyUser` pour s'assurer que seuls les utilisateurs authentifiés peuvent créer une réservation
// Mettre à jour une réservation
router.put("/:id", verifyUser, updateBooking); // Vous pourriez vouloir vérifier si l'utilisateur est le créateur de la réservation ou un admin
// Supprimer une réservation
router.delete("/:id", verifyUser, deleteBooking); // Assure que seul un admin peut supprimer une réservation
// Récupérer une réservation par son ID
router.get("/me", verifyUser, getBooking);

// Récupérer toutes les réservations
router.get("/", verifyAdmin, getBookings); // Limite cette opération aux administrateurs

router.get('/user/:userId', verifyUser, getBookingsByUser);

export default router;