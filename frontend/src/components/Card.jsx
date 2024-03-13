import React from 'react';


export function Card({ item }) {
    return (
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-2"> {/* Ajustez les marges extérieures avec m-2 ou une autre valeur si nécessaire */}
        <img src={item.src} alt={item.title} className="w-full h-40 object-cover rounded-t-lg"/> {/* Ajustez la hauteur avec h-40 ou une autre valeur si nécessaire */}
        <div className="p-4"> {/* Réduisez le padding interne avec p-4 ou une autre valeur plus petite si nécessaire */}
          <h5 className="text-lg font-bold mb-2">{item.title}</h5> {/* Ajustez la marge du bas avec mb-2 ou une autre valeur plus petite si nécessaire */}
          <p className="text-gray-700 text-sm mb-1">{item.city}</p> {/* Utilisez text-sm pour une taille de police plus petite et mb-1 pour une marge plus petite */}
          <p className="text-gray-700 text-sm">{item.price}</p>
        </div>
      </div>
    );
  }