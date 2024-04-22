import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  searchRoomsByPriceAndCapacity
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
// Route de recherche AVANT les routes qui prennent un ID
router.get("/search", searchRoomsByPriceAndCapacity);
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
