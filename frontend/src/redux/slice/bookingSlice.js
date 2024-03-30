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

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
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
      });
  },
});

export default bookingsSlice.reducer;
