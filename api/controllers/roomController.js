import RoomModel from "../models/RoomModel.js";
import HotelModel from "../models/HotelModel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  // Création d'un nouvel objet chambre avec les données reçues dans le corps de la requête
  // et les chemins des images téléchargées
  const newRoomData = {
    ...req.body,
    images: req.files.map(file => file.path), // Stocke les chemins des images téléchargées
  };
  const newRoom = new RoomModel(newRoomData);

  try {
    const savedRoom = await newRoom.save(); // Sauvegarde de la chambre dans la base de données

    try {
      // Mise à jour du document de l'hôtel correspondant pour ajouter l'ID de la chambre nouvellement créée
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      // En cas d'erreur lors de la mise à jour de l'hôtel, on passe l'erreur au middleware d'erreur
      next(err);
      return; 
    }

    // Envoi d'une réponse avec la chambre sauvegardée si tout s'est bien passé
    res.status(201).json(savedRoom);
  } catch (err) {
    // En cas d'erreur lors de la sauvegarde de la chambre, on passe l'erreur au middleware d'erreur
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await RoomModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateRoom);
      } catch (err) {
        next(err);
      }
  };

  // Supprimer une chambre
  export const deleteRoom = async (req, res, next) => {
    
    try {
        await RoomModel.findByIdAndDelete(req.params.id);
        try {
          // Supprime l'ID de la chambre supprimée de la liste des chambres de l'hôtel
            await HotelModel.findByIdAndUpdate(hotelId, {
              $pull: { rooms: req.params.id},
            });
          } catch (err) {
              next(err);
          }
        res.status(200).json("Room has been deleted");
    } catch (err) {
      next(err);
    }
  };
  // Récupérer une chambre
  export const getRoom = async (req, res, next) => {
    try {
        const room = await RoomModel.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  };

  // Récupérer toutes les chambres
  export const getRooms = async (req, res, next) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  };

  // Rechercher des chambres par prix et capacité
  export const searchRoomsByPriceAndCapacity = async (req, res) => {
    const { price, maxPeople } = req.query;
  
    let queryConditions = {};
  
    
    if (price) {
      queryConditions.price = { $lte: Number(price) };// Chambres avec un prix inférieur ou égal à celui spécifié
    }
  
    if (maxPeople) {
      queryConditions.maxPeople = { $eq: Number(maxPeople) }; // Chambres pouvant accueillir un nombre spécifique de personnes
    }
  
    try {
      const rooms = await RoomModel.find(queryConditions);
  
      if (!rooms.length) {
        return res.status(404).json({ message: "Aucune chambre correspondante trouvée" });
      }
  
      res.status(200).json(rooms);
    } catch (error) {
      console.error("Erreur lors de la recherche de chambres:", error);
      res.status(500).json({ message: "Erreur lors de la recherche de chambres", error: error.message });
    }
  };
  
  
  
  

