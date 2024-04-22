import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import RatingStars from "../components/RatingStars";
import axios from "axios";
import { fetchRoomDetails } from "../services/roomService";
import { useParams, useNavigate } from "react-router-dom";

function RoomDetails() {
  const user = useSelector(state => state.authSlice.user);
  const token = user?.token;
  let { id } = useParams();
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const BASE_URL = "http://localhost:8800/api";

  async function fetchRoomReviews(roomId) {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/room/${roomId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des avis de la chambre: ", error);
      throw error;
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const details = await fetchRoomDetails(id);
        console.log("Room Details:", details);
        setRoomDetails(details);

        // Utiliser l'ID de la chambre pour récupérer les avis
        const reviewData = await fetchRoomReviews(details._id);
        console.log("Reviews details:", reviewData);
        setReviews(reviewData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la chambre ou des avis: ",
          error
        );
      }
    }

    loadData();
  }, [id]);

  if (!roomDetails) {
    return <div>Chargement...</div>;
  }

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
      try {
        const response = await axios.delete(`http://localhost:8800/api/reviews/${reviewId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Assurez-vous que le token est disponible
          }
        });
        if (response.status === 200) {
          toast.success("Commentaire supprimé avec succès");
          // Filtrer les commentaires pour enlever celui qui a été supprimé
          setReviews(reviews.filter(review => review._id !== reviewId));
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du commentaire :", error);
        toast.error("La suppression du commentaire a échoué.");
      }
    }
  };
  
  const handleReserveClick = () => {
    navigate("/create-booking", { state: { roomId: id } });
  };

  return (
    <div className="mt-2 px-8 py-8 max-w-5xl mx-auto">
      <h1 className="text-4xl mb-4">{roomDetails.title}</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-col md:flex-row w-full">
          {roomDetails.images && roomDetails.images[0] && (
            <img
              src={`http://localhost:8800/${roomDetails.images[0]}`}
              alt="Main room view"
              className="w-full md:w-2/3 h-auto object-cover rounded-lg shadow md:mr-2"
            />
          )}
          <div className="w-full md:w-1/3 flex flex-col gap-2">
            {roomDetails.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8800/${image}`}
                alt={`Room view ${index + 2}`}
                className="w-full h-48 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <h1 className="mt-12 text-3xl">Description</h1>
        <p className="mt-2">{roomDetails.description}</p>
      </div>
      <h1 className="mt-12 text-3xl">Ses points fort </h1>
      <div className="mt-12 grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg">Adresse: {roomDetails.address}</p>
          <p className="text-lg">
            Nombre de personnes max: {roomDetails.maxPeople}
          </p>
          <p className="text-lg">Avantages: {roomDetails.perks}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-2xl">
          <div className="text-2xl text-center">
            Prix: {roomDetails.price}$ CAD par nuit
          </div>
          <button className="mt-2 primary" onClick={handleReserveClick}>
            Réserver
          </button>
        </div>
      </div>
      <div>
        <h2 className="mt-12 text-3xl font-semibold">Commentaires</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 mt-4">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white uppercase font-semibold text-lg">
                  {review.user.firstname[0]}
                  {review.user.lastname[0]}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {review.user.firstname} {review.user.lastname}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-gray-800 text-lg">{review.comment}</p>
                <div className="flex items-center">
                  Note:
                  <RatingStars rating={review.rating} />
                  {user?.userDetails?._id === review.user._id && (
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-3">
            Aucun commentaire pour cette chambre.
          </p>
        )}
      </div>
    </div>
  );
}

export default RoomDetails;
