import axios from "axios";

// URL de l'API
const BASE_URL = "http://localhost:8800/api";

// Fonction pour récupérer les avis pour une chambre spécifique
export const fetchRoomReviews = async (roomId) => {
    try {
        const response = await axios.get(`${BASE_URL}/rooms/${roomId}/reviews`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des avis de la chambre: ", error);
        throw error;
    }
};
