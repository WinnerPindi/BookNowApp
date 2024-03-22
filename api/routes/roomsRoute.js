import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

//Creation d'un Room
router.post("/:hotelid", verifyAdmin, upload.array("images", 5), createRoom);
//UPDATE UN Room
router.put("/:id", verifyAdmin, updateRoom);
//DELETE UN Room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET A Room
router.get("/:id", getRoom);
//GET ALL RoomS
router.get("/", getRooms);

export default router;
