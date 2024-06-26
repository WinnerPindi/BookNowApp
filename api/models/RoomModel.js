import mongoose from "mongoose";

const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address:{
      type: String,
      required: true,
    },
    perks:{
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    images:[{type:String}],

    description: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailaibleDates: {type: [Date]} }],
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
