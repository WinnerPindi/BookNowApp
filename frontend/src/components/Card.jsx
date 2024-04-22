import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const IMAGE_BASE_URL = "http://localhost:8800/";
const MAX_DESCRIPTION_LENGTH = 100; // Longueur maximale de la description affichée

export function Card({ item }) {
  const imageUrl = item.images[0]
    ? `${IMAGE_BASE_URL}${item.images[0]}`
    : "URL_DE_VOTRE_IMAGE_PAR_DEFAUT";
  let navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out-sine",
      once: true,
    });
  }, []);

  const handleCardClick = () => {
    navigate(`/rooms/${item._id}`);
  };

  const truncatedDescription =
    item.description.length > MAX_DESCRIPTION_LENGTH
      ? `${item.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
      : item.description;

  return (
    <div data-aos="fade-up">
      <div
        className="max-w-sm rounded-lg overflow-hidden shadow-lg m-2 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        onClick={handleCardClick}
      >
        <img
          src={imageUrl}
          alt={item.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h5 className="text-lg font-bold mb-2">{item.title}</h5>
          <p className="text-gray-700 text-sm mb-1">{truncatedDescription}</p>
          <p className="text-gray-700 text-sm">{item.price}$ CAD nuit</p>
        </div>
      </div>
    </div>
  );
}
