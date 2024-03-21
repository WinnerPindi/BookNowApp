import RoomModel from "../models/RoomModel.js";
import HotelModel from "../models/HotelModel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new RoomModel(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
        next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
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

  export const deleteRoom = async (req, res, next) => {
    
    try {
        await RoomModel.findByIdAndDelete(req.params.id);
        try {
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
  export const getRoom = async (req, res, next) => {
    try {
        const room = await RoomModel.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  };

  export const getRooms = async (req, res, next) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  };

