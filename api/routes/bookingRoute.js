import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"; // Assumant l'existence de ces middlewares
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
  getBookingsByUser,
  getUserBookingHistory
} from "../controllers/bookingController.js";

const router = express.Router();


// Créer une réservation
router.post("/", verifyUser, createBooking); 
// Mettre à jour une réservation
router.put("/:id", verifyUser, updateBooking); 
// Recuperer l'historique de réservation d'un utilisateur 
router.get("/history/:userId", verifyUser, getUserBookingHistory)
// Supprimer une réservation
router.delete("/:id", verifyUser, deleteBooking); 
// Récupérer une réservation par son ID
router.get("/me", verifyUser, getBooking);
// Récupérer toutes les réservations
router.get("/", verifyAdmin, getBookings); 
// Récupérer les réservations d'un utilisateur spécifique
router.get('/user/:userId', verifyUser, getBookingsByUser);

export default router;