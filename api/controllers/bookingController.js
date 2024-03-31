import BookingModel from "../models/BookingModel.js";

export const createBooking = async (req, res, next) => {
  const newBooking = new BookingModel({
    ...req.body,
    user: req.user.id, // Assumant que `req.user` est défini par un middleware d'authentification
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    await BookingModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted.");
  } catch (error) {
    next(error);
  }
};



export const getBookings = async (req, res, next) => {
  try {
    const bookings = await BookingModel.find();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req, res, next) => {
 console.log(req.user._id);
  try {
    const booking = await BookingModel.find({"user":req.user._id}).select("-user").populate('room').exec();
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

export const getBookingsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const bookings = await BookingModel.find({ user: userId }).populate('room');
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
