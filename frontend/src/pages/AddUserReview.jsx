import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AddUserReview = () => {
    const [searchParams] = useSearchParams();
    const [roomId, setRoomId] = useState(null);  // Nous stockons ici l'ID de la chambre une fois récupéré
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [roomDetails, setRoomDetails] = useState(null);

    const user = useSelector(state => state.authSlice.user);
    const token = user?.token;
    const BASE_URL = "http://localhost:8800/api";

    // Récupération des détails de la réservation pour obtenir l'ID de la chambre
    useEffect(() => {
        const bookingId = searchParams.get('bookingId');
        if (bookingId) {
            fetchBookingDetails(bookingId);
        }
    }, [searchParams]);

    const fetchBookingDetails = async (bookingId) => {
        try {
            const response = await axios.get(`${BASE_URL}/bookings/${bookingId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const bookingData = response.data;
            setRoomId(bookingData.room);  // Assurez-vous que 'room' est la clé contenant l'ID de la chambre dans la réponse
            fetchRoomDetails(bookingData.room);
        } catch (error) {
            toast.error("Erreur lors de la récupération des détails de la réservation");
            console.error("Fetch booking details error:", error);
        }
    };

    const fetchRoomDetails = async (roomId) => {
        try {
            const response = await axios.get(`${BASE_URL}/rooms/${roomId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRoomDetails(response.data);
        } catch (error) {
            toast.error("Erreur lors de la récupération des détails de la chambre");
            console.error("Fetch room details error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${BASE_URL}/reviews`, {
                room: roomId,
                user: user.userDetails._id,
                rating,
                comment
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Commentaire ajouté avec succès!');
            setRating(0);
            setComment('');
        } catch (error) {
            toast.error("Erreur lors de l'ajout du commentaire");
            console.error("Submit review error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Ajouter un commentaire pour {roomDetails?.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Note</label>
                    <select
                        id="rating"
                        name="rating"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value, 10))}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                        {[...Array(6).keys()].map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Commentaire</label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </button>
            </form>
        </div>
    );
};

export default AddUserReview;
