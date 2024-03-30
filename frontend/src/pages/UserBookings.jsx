import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../redux/slice/bookingSlice';

const UserBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookingSlice);
  //const bookings = useSelector((state) => state);
  console.log(bookings);
  // Correction ici : vous aviez userDetails mais pas user défini
  const { userDetails } = useSelector((state) => state.authSlice.user);
  const userId = userDetails?._id; // Assurez-vous que cela correspond à la structure de vos données utilisateur

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserBookings(userId));
    }
  }, [dispatch, userId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message || "Une erreur s'est produite"}</div>;

  return (
    <div>
     <h2>Mes réservations</h2>
      {bookings?.map((booking) => (
        <div key={booking._id}>
          <p>Chambre: {booking.room}</p>
          <p>Date d'arrivée: {booking.arrivalDate}</p>
          <p>Date de départ: {booking.departDate}</p>
        </div>
      ))}
    </div>
  );
};

export default UserBookings;
