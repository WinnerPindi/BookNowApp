import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../conf.js";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("api/auth/login", credentials);
      return response;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        (state.user = null),
        (state.message = null);
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        (state.user = action.payload.data), (state.message = null);
        localStorage.setItem(
          "profile",
          JSON.stringify({ ...action?.payload.data })
        );
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action);
        (state.user = null), (state.message = action.payload.stack);
      });
  },
});

export default authSlice.reducer;
