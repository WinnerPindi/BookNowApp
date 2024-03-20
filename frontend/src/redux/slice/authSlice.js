import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../conf.js'; // Assurez-vous que ce chemin est correct

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post('api/auth/login', credentials);
      return response.data; // Assurez-vous de retourner les données attendues
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, {dispatch}) => {
  localStorage.removeItem('profile'); // Supprimez les données de profil stockées localement
  dispatch(clearUser()); // Dispatch une action pour réinitialiser l'utilisateur
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('profile')
      ? JSON.parse(localStorage.getItem('profile'))
      : null,
    message: null,
  },
  reducers: {
    clearUser(state) {
      state.user = null; // Réinitialisez l'état de l'utilisateur
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.user = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload; // Assurez-vous que ceci correspond à la structure de votre état et des données retournées
        localStorage.setItem('profile', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.message = action.payload?.message; // Utilisez message ou une propriété pertinente de payload
      })
      // Gérez l'état pour logout.fulfilled pour nettoyer l'utilisateur
      .addCase(logout.fulfilled, (state) => {
        state.user = null; // Assurez-vous que l'état de l'utilisateur est nettoyé
      });
  },
});

export const { clearUser } = authSlice.actions;

export default authSlice.reducer;
