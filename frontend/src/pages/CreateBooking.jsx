import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CreateBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authSlice.user);
  const userDetails = user?.userDetails;
  const token = user?.token; 

  const roomId = location.state?.roomId;
  const [arrivalDate, setArrivalDate] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nextAvailableDate, setNextAvailableDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNextAvailableDate(null); // Réinitialiser la prochaine date disponible

    try {
      const response = await axios.post('http://localhost:8800/api/bookings', {
        room: roomId,
        user: userDetails._id,
        arrivalDate,
        departDate
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success('Réservation réussie!');
      navigate('/bookings');
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      if (error.response && error.response.data.nextAvailableDate) {
        setNextAvailableDate(error.response.data.nextAvailableDate);
        toast.error(`La chambre n'est pas disponible. Prochaine disponibilité : ${error.response.data.nextAvailableDate}`);
      } else {
        toast.error('La réservation a échoué.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Créer une réservation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700">Date d'arrivée</label>
          <input
            type="date"
            id="arrivalDate"
            name="arrivalDate"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="departDate" className="block text-sm font-medium text-gray-700">Date de départ</label>
          <input
            type="date"
            id="departDate"
            name="departDate"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        {nextAvailableDate && (
          <div className="text-red-500">
            La chambre n'est pas disponible jusqu'à : {nextAvailableDate}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? 'Réservation en cours...' : 'Réserver'}
        </button>
      </form>
    </div>
  );
};

export default CreateBooking;
