import ReviewModel from "../models/ReviewModel.js";
// Create a Review
export const createReview = async (req, res, next) => {
  const newReview = new ReviewModel({
      room: req.body.room,
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
  });

  try {
      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
  } catch (error) {
      next(error);
  }
};


// Update a Review
export const updateReview = async (req, res, next) => {
  try {
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

// Delete a Review
export const deleteReview = async (req, res, next) => {
  try {
    await ReviewModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Review has been deleted.");
  } catch (error) {
    next(error);
  }
};

// Get all Reviews
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewModel.find().populate('room', 'title').populate('user', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// Get a single Review by ID
export const getReview = async (req, res, next) => {
  try {
    const review = await ReviewModel.findById(req.params.id).populate('room', 'title').populate('user', 'name');
    if (!review) {
      res.status(404).json("Review not found.");
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
};

// Get Reviews by User
export const getReviewsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const reviews = await ReviewModel.find({ user: userId }).populate('room', 'title');
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// Récupérer tous les avis pour une chambre donnée
export const getReviewsByRoom = async (req, res, next) => {
  const roomId = req.params.roomId;  // Récupération de l'ID de la chambre depuis les paramètres de la route
  try {
    // Recherche des avis liés à cette chambre et population des données de l'utilisateur associé
    const reviews = await ReviewModel.find({ room: roomId }).populate('user', 'firstname lastname');
    if (reviews.length === 0) {
      res.status(404).json({ message: "Aucun avis trouvé pour cette chambre." });
    } else {
      res.status(200).json(reviews);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des avis", error });
  }
};
