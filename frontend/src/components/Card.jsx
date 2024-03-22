import React from 'react';


export function Card({ item }) {
    return (
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-2"> 
        <img src={item.src} alt={item.title} className="w-full h-40 object-cover rounded-t-lg"/> 
        <div className="p-4"> 
          <h5 className="text-lg font-bold mb-2">{item.title}</h5> 
          <p className="text-gray-700 text-sm mb-1">{item.description}</p> 
          <p className="text-gray-700 text-sm">{item.price}$</p>
        </div>
      </div>
    );
  }