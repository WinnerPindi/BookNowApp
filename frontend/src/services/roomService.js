import axios from "axios";

//URL de L'API
const BASE_URL = "http://localhost:8800/api";

//Fonction pour récupérer toutes les chambres 

export const fetchRooms = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/rooms`);
        return response.data;
        
    } catch (error) {
        console.error("Erreur lors de la récupération des chambres: ", error);
        throw error;
        
    }
};

export const fetchRoomDetails = async (id) => {
    const response = await axios.get(`${BASE_URL}/rooms/${id}`);
    return response.data;
}