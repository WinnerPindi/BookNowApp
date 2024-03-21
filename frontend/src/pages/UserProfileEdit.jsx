import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../redux/slice/authSlice'; // Importez votre action pour la mise à jour
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function UserProfileEdit() {
  const { userDetails } = useSelector((state) => state.authSlice.user);
  const [formData, setFormData] = useState({
    lastname: userDetails?.lastname || '',
    firstname: userDetails?.firstname || '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Supposons que updateUserDetails est votre action Redux pour mettre à jour l'utilisateur
      await dispatch(updateUserDetails({ id: userDetails._id, ...formData }));
      toast.success('Profil mis à jour avec succès !');
      navigate('/'); // Redirige vers la page d'accueil ou une autre page de confirmation
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la mise à jour du profil.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl  font-bold mb-4">Modifier le profil</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
}