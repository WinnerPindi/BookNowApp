import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import roomsRoute from "./routes/roomsRoute.js";
import hotelsRoute from "./routes/hotelsRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({origin:["http://localhost:3000"],
credentials:true
}))
dotenv.config();

//Fonction qui permet de se connecter à MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    console.error("Falied to connect to MongoDB", error);
    throw error;
  }
  
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/reviews", reviewRoute);

app.use((err,req,res,next) => {
  const errorStatus = err.status || 500 ;
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
});


app.listen(8800, () => {
    //Appel de la fonction de connexion à Moogo
  connect();
  console.log("Connected to backend");
});
