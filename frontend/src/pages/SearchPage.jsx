import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppartGrid } from '../components/AppartGrid';
import { SearchBarre } from '../components/SearchBarre';

export function SearchPage() {
    const location = useLocation();
    const { rooms } = location.state || {}; // Récupérer les résultats de la recherche

    return (
        <div className='p-40'>
            <SearchBarre/>
            <div className="pt-10 text-4xl font-extrabold text-center">Résultats de la recherche</div>
            <AppartGrid items={rooms} />
        </div>
    );
}
