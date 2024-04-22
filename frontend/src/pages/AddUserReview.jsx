import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddUserReview = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.authSlice);
    const userId = user?.userDetails?._id;
    const token = user?.token;
    const { roomId } = useParams();

    if (!roomId) {
        toast.error("Aucun ID de chambre trouvé.");
        return <div>ID de chambre manquant pour ajouter un commentaire.</div>;
    }

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:8800/api/reviews', {
                room: roomId,
                user: userId,
                rating,
                comment
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response.data);
            toast.success('Commentaire ajouté avec succès!');
            // On redirige vers la page de réservation 
            navigate('/bookings')

        } catch (error) {
            console.error('Erreur lors de l’ajout du commentaire:', error);
            toast.error('L’ajout du commentaire a échoué.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Ajouter un commentaire sur la chambre</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Note</label>
                    <select
                        id="rating"
                        name="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Très Bon</option>
                        <option value="3">3 - Bon</option>
                        <option value="2">2 - Passable</option>
                        <option value="1">1 - Médiocre</option>
                        <option value="0">0 - Terrible</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Commentaire</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="3"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {isSubmitting ? 'Envoi en cours...' : 'Soumettre le commentaire'}
                </button>
            </form>
        </div>
    );
};

export default AddUserReview;
