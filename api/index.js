import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import roomsRoute from "./routes/roomsRoute.js";
import hotelsRoute from "./routes/hotelsRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
// Configuration de CORS pour permettre les requêtes entre les domaines
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
// Chargement des variables d'environnement à partir du fichier .env
dotenv.config();

//Fonction qui permet de se connecter à MongoDB
const connect = async () => {
  try {
    // Tentative de connexion à la base de données MongoDB
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    console.error("Falied to connect to MongoDB", error);
    throw error;
  }
};
// Écouteur d'événements pour détecter les déconnexions de MongoDB
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// Middleware pour parser le JSON entrant dans les requêtes HTTP
app.use(express.json());
// Middleware pour parser les cookies des requêtes HTTP
app.use(cookieParser());
// Configuration d'un chemin statique pour servir les fichiers uploads
app.use("/uploads", express.static("uploads"));

// Définition des routes pour différentes sections de l'API
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/reviews", reviewRoute);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500; // Définit le code d'erreur HTTP
  const errorMessage = err.message || "Something went wrong!";
  // Renvoie une réponse JSON avec les détails de l'erreur
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Démarrage du serveur sur le port 8800
app.listen(8800, () => {
  //Appel de la fonction de connexion à Moogo
  connect();
  console.log("Connected to backend");
});
