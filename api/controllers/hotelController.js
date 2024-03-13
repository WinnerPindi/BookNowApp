import HotelModel from "../models/HotelModel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new HotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await HotelModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateHotel);
      } catch (err) {
        next(err);
      }
  };

  export const deleteHotel = async (req, res, next) => {
    
    try {
        await HotelModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
      next(err);
    }
  };
  export const getHotel = async (req, res, next) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  };

  export const getHotels = async (req, res, next) => {
    try {
        const hotels = await HotelModel.find();
        res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };
