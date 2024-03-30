import mongoose from "mongoose";

const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  departDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Booking", BookingSchema);
