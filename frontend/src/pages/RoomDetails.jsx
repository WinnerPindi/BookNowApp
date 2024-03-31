import React, { useState, useEffect } from "react";
import { fetchRoomDetails } from "../services/roomService";
import { useParams, useNavigate } from "react-router-dom";

function RoomDetails() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    const loadRoomDetails = async () => {
      try {
        const details = await fetchRoomDetails(id);
        setRoomDetails(details);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la chambre: ",
          error
        );
      }
    };


    loadRoomDetails();
  }, [id]);

  if (!roomDetails) {
    return <div>Chargement...</div>;
  }

  const handleReserveClick = () =>{
    navigate('/create-booking', {state:{ roomId: id} })
  }

  return (
    <div className="mt-2 px-8 py-8 max-w-5xl mx-auto">
      {" "}
      {/* Ajusté la largeur maximale à 5xl pour plus de largeur */}
      <h1 className="text-4xl mb-4">{roomDetails.title}</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-col md:flex-row w-full">
          <img
            src={`http://localhost:8800/${roomDetails.images[0]}`}
            alt="Main room view"
            className="w-full md:w-2/3 h-auto object-cover rounded-lg shadow md:mr-2" // Réduite la marge à droite (mr) à 2 pour moins d'espace
          />
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
        <div className="mt-4 border"></div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg">
            Adresse: {roomDetails.address}
          </p>
          <p className="text-lg">
            Nombre de personne max : {roomDetails.maxPeople}
          </p>
          <p className="text-lg">Avantage: {roomDetails.perks}</p>
        </div>

        <div className="bg-white shadow p-4 rounded-2xl">
          <div className="text-2xl text-center">
            Prix: {roomDetails.price}$ CAD nuit
          </div>
          <button className="mt-2 primary" onClick={handleReserveClick}> Réserver </button>
        </div>
      </div>
      

    </div>
  );
}

export default RoomDetails;
