import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Creation d'un Room
router.post("/:hotelid", verifyAdmin, createRoom);
//UPDATE UN Room
router.put("/:id", verifyAdmin, updateRoom);
//DELETE UN Room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET A Room
router.get("/:id", getRoom);
//GET ALL RoomS
router.get("/", getRooms);

export default router;
