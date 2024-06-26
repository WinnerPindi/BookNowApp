import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../conf.js";

API.defaults.withCredentials = true;

export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (userId, { rejectWithValue }) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.withCredentials = true;
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get(`api/bookings/me`);
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);
export const fetchUserBookingHistory = createAsyncThunk(
  "bookings/fetchUserBookingHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.withCredentials = true;
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get(`api/bookings/history/${userId}`);
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (bookingId, { getState, rejectWithValue }) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.delete(`api/bookings/${bookingId}`);
      if (response.status !== 200) {
        throw new Error("Erreur lors de la suppression de la réservation");
      }
      return bookingId; // Retourne l'ID de la réservation supprimée pour le supprimer de l'état
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    bookingHistory: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        console.log(action.payload);
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Gérer la suppression d'une réservation
      .addCase(deleteBooking.pending, (state) => {
        // Optionnel : gérer l'état de chargement de la suppression
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.payload
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        // Optionnel : gérer une erreur de suppression
      })
      .addCase(fetchUserBookingHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookingHistory.fulfilled, (state, action) => {
        state.bookingHistory = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserBookingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default bookingsSlice.reducer;
