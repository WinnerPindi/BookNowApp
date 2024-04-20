import { BiCommentDetail } from "react-icons/bi";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings, deleteBooking } from "../redux/slice/bookingSlice";
import { BiTrash, BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BASE_IMAGE_URL = "http://localhost:8800/";

const UserBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, loading, error } = useSelector(
    (state) => state.bookingSlice
  );
  const { userDetails } = useSelector((state) => state.authSlice.user);
  const userId = userDetails?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserBookings(userId));
    }
  }, [dispatch, userId]);

  if (loading) return <div>Chargement...</div>;
  if (error)
    return <div>Erreur : {error.message || "Une erreur s'est produite"}</div>;

  const handleAddReview = (bookingId) => {
    navigate(`/reviews/new?bookingId=${bookingId}`); // Redirection avec le bookingId si nécessaire
  };

  return (
    <div className="max-w-4xl mx-auto ">
      <h2 className="mt-12 text-4xl text-center  mb-10">Mes réservations</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg mb-5 p-5 flex flex-col gap-4"
          >
            {/* Afficher l'image de la chambre */}
            {booking.room.images && booking.room.images[0] && (
              <img
                src={`${BASE_IMAGE_URL}${booking.room.images[0]}`}
                alt={`Photo de la chambre ${booking.room.title}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            {/* Afficher le titre de la chambre et les dates */}
            <h3 className="text-xl font-semibold">{` ${booking.room.title}`}</h3>
            <p className="text-gray-600">
              Date d'arrivée:{" "}
              <span className="font-semibold">
                {new Date(booking.arrivalDate).toLocaleDateString()}
              </span>
            </p>
            <p className="text-gray-600">
              Date de départ:{" "}
              <span className="font-semibold">
                {new Date(booking.departDate).toLocaleDateString()}
              </span>
            </p>
            {/* Actions */}
            <div className="flex justify-end items-center gap-4">
              <button
                className="flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => handleAddReview(booking._id)}
              >
                <BiCommentDetail />
                <span>Ajouter un commentaire</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {}}
              >
                <BiEdit />
                <span>Modifier</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => {
                  if (
                    window.confirm(
                      "Êtes-vous sûr de vouloir supprimer cette réservation ?"
                    )
                  ) {
                    dispatch(deleteBooking(booking._id));
                  }
                }}
              >
                <BiTrash />
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-5">Aucune réservation trouvée.</div>
      )}
    </div>
  );
};

export default UserBookings;
