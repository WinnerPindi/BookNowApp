import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Assumant que vous utilisez Axios pour les requêtes HTTP

// URL de base de l'API
const BASE_URL = 'http://localhost:8800/api';

// Fetch les réservations d'un utilisateur
export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);