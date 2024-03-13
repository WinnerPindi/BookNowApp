import express from "express";
import HotelModel from "../models/HotelModel.js";
import { createError } from "../utils/error.js";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotelController.js";

const router = express.Router();

//Creation d'un hôtel
router.post("/", createHotel);
//UPDATE UN HOTEL
router.put("/:id",updateHotel);
//DELETE UN HOTEL
router.delete("/:id", deleteHotel);
//GET A HOTEL
router.get("/:id", getHotel);
//GET ALL HOTELS
router.get("/", getHotels);

export default router;
