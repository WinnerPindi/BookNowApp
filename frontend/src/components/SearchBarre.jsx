import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function SearchBarre() {
    const [price, setPrice] = useState('');
    const [maxPeople, setMaxPeople] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8800/api/rooms/search`, {
                params: {
                    price: price,
                    maxPeople: maxPeople
                }
            });
            // Utiliser navigate pour passer les résultats à SearchPage
            navigate('/search', { state: { rooms: response.data } });
        } catch ( error ) {
            console.error('Erreur lors de la recherche de chambres:', error);
        }
    };

    return (
        <div className="-mt-20 relative flex justify-center">
            <div className="relative border border-gray-300 p-10 rounded-lg bg-white">
                <div className="flex space-x-10">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="priceInput" className="text-lg font-semibold">Prix ?</label>
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
                        <label htmlFor="peopleInput" className="text-lg font-semibold">Qui ?</label>
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
                        Rechercher
                    </button>
                </div>
            </div>
        </div>
    );
}
