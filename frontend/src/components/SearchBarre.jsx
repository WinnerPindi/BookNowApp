import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function SearchBarre() {
  const [price, setPrice] = useState('');
  const [maxPeople, setMaxPeople] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/rooms/search`, {
        params: {
          price: price,
          maxPeople: maxPeople
        }
      });
      setGlobalRooms(response.data);  // Stocker les données globalement ou les envoyer via contexte / état global
      navigate('/search');  // Rediriger vers la page de résultats de recherche
    } catch (error) {
      console.error('Erreur lors de la recherche de chambres:', error);
    }
  };

  return (
    <div className="-mt-20 relative flex justify-center">
      <div className="relative border border-gray-300 p-10 rounded-lg bg-white">
        <div className="flex space-x-10">
          <div className="flex flex-col space-y-1">
            <label htmlFor="priceInput" className="text-lg font-semibold">
              Prix ?
            </label>
            <input
              id="priceInput"
              type="text"
              placeholder="Quel prix ?"
              className="cursor-pointer border border-gray-300 p-2 rounded outline-none"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="peopleInput" className="text-lg font-semibold">
              Qui ?
            </label>
            <input
              id="peopleInput"
              type="text"
              placeholder="Combien de personnes ?"
              className="cursor-pointer border border-gray-300 p-2 rounded outline-none"
              value={maxPeople}
              onChange={e => setMaxPeople(e.target.value)}
            />
          </div>

          <button className="bg-primary text-white p-5 rounded" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
