import BookingModel from "../models/BookingModel.js";


// Creation d'une réservation 
export const createBooking = async (req, res, next) => {
  const { room, arrivalDate, departDate } = req.body;

  try {
    // Vérifier si une réservation existe déjà pour ces dates et cette chambre
    const overlappingBooking = await BookingModel.findOne({
      room: room,
      $or: [
        {
          arrivalDate: { $lte: departDate },
          departDate: { $gte: arrivalDate },
        },
        { arrivalDate: { $gte: arrivalDate, $lte: departDate } },
      ],
    });

    if (overlappingBooking) {
      // Si une réservation chevauchante est trouvée, trouver la prochaine date disponible
      const nextAvailableDate = await BookingModel.findOne({
        room: room,
        departDate: { $gte: new Date() },
      })
        .sort({ departDate: 1 }) // Triée par la date de départ la plus proche
        .select("departDate");

      return res.status(400).json({
        message: "Room is already booked for the given dates.",
        nextAvailableDate: nextAvailableDate
          ? nextAvailableDate.departDate
          : "No future bookings found",
      });
    }

    // Créer une nouvelle réservation si aucune chevauchante n'est trouvée
    const newBooking = new BookingModel({
      ...req.body,
      user: req.user.id,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour une réservation par ID
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

// Supprimer une réservation par ID
export const deleteBooking = async (req, res, next) => {
  try {
    await BookingModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted.");
  } catch (error) {
    next(error);
  }
};

// Récupérer toutes les réservations 
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await BookingModel.find();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// Récupérer toutes les réservations 
export const getBooking = async (req, res, next) => {
  console.log(req.user._id);
  try {
    const currentDate = new Date();
    const bookings = await BookingModel.find({ 
      user: req.user._id,
      departDate: { $gte: currentDate } // Filtrer les réservations dont la date de départ est postérieure ou égale à la date actuelle
    })
      .select("-user")
      .populate("room")
      .exec();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
// Récupérer l'historique des réservations d'un utilisateur
export const getUserBookingHistory = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const currentDate = new Date();
    // Récupérer toutes les réservations de l'utilisateur dont la date de départ est antérieure à la date actuelle
    const bookingHistory = await BookingModel.find({
      user: userId,
      departDate: { $lt: currentDate }
    }).populate("room");
    res.status(200).json(bookingHistory);
  } catch (error) {
    next(error);
  }
};
// Récupérer les réservations par utilisateur
export const getBookingsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const bookings = await BookingModel.find({ user: userId }).populate("room");
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
