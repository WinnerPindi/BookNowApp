import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UpdateBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId;

  const user = useSelector((state) => state.authSlice.user);
  const userDetails = user?.userDetails;
  const token = user?.token; 

  const [arrivalDate, setArrivalDate] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      console.log(`Fetching details for booking ID: ${bookingId}`);
      try {
        const response = await axios.get(`http://localhost:8800/api/bookings/${bookingId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setArrivalDate(response.data.arrivalDate);
        setDepartDate(response.data.departDate);
      } catch (error) {
        console.error('Erreur lors du chargement des détails de la réservation:', error);
        toast.error('Échec du chargement des détails de la réservation.');
      }
    };
  
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId, token]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.put(`http://localhost:8800/api/bookings/${bookingId}`, {
        arrivalDate,
        departDate
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success('Mise à jour de la réservation réussie!');
      navigate('/bookings');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réservation:', error);
      toast.error('La mise à jour de la réservation a échoué.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-20 container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Modifier la réservation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700">Nouvelle date d'arrivée</label>
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
          <label htmlFor="departDate" className="block text-sm font-medium text-gray-700">Nouvelle date de départ</label>
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  );
};

export default UpdateBooking;
