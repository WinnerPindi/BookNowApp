import express from "express";
import HotelModel from "../models/HotelModel.js";

const router = express.Router();

//Creation d'un hôtel
router.post("/", async (req, res) => {
  const newHotel = new HotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE UN HOTEL
router.put("/:id", async (req, res) => {
  try {
    const updateHotel = await HotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE UN HOTEL
router.delete("/:id", async (req, res) => {
  await HotelModel.findByIdAndDelete(req.params.id);
  res.status(200).json("Hotel has been deleted");
});

//GET A HOTEL
router.get("/:id", async (req, res) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(hotel);
  }
});
//GET ALL HOTELS
router.get("/", async (req, res) => {
  try {
    const hotels = await HotelModel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
