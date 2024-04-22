import React, { useState } from 'react';
import axios from 'axios';
import { SearchBarre } from '../components/SearchBarre';  
import { AppartGrid } from '../components/AppartGrid'

export function SearchPage() {
    const [rooms, setRooms] = useState([]);

    const handleSearch = async (price, maxPeople) => {
        try {
            const response = await axios.get(`http://localhost:8800/api/rooms/search`, {
                params: {
                    price: price,
                    maxPeople: maxPeople
                }
            });
            setRooms(response.data);
        } catch (error) {
            console.error('Erreur lors de la recherche de chambres:', error);
           
        }
    };

    return (
        <div>
            <SearchBarre onSearch={handleSearch} />
            <AppartGrid items={rooms} />
        </div>
    );
}
