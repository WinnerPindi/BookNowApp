import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../conf.js'; 

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post('api/auth/login', credentials);
      return response.data; 
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

export const updateUserDetails = createAsyncThunk(
  'auth/updateUserDetails',
  async ({ id, ...updateData }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().authSlice; // Obtenez les détails de l'utilisateur actuel à partir de l'état
      if (!user || !user.userDetails) {
        throw new Error("Aucun utilisateur connecté");
      }
      const response = await API.put(`api/users/${id}`, updateData); // Utilisez votre API pour envoyer la requête PUT
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

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
        state.user = action.payload; 
        localStorage.setItem('profile', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.message = action.payload?.message; 
      })
      // Gérez l'état pour logout.fulfilled pour nettoyer l'utilisateur
      .addCase(logout.fulfilled, (state) => {
        state.user = null; 
      })
      // Ajoutez les cas pour gérer les états de votre action updateUserDetails ici
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        // Mise à jour réussie, mettez à jour l'état de l'utilisateur avec les nouvelles données
        state.user.userDetails = action.payload;
        localStorage.setItem('profile', JSON.stringify(state.user)); // Mettez à jour localStorage si nécessaire
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        // Gérez l'échec de la mise à jour ici
        console.error("Échec de la mise à jour des détails de l'utilisateur", action.payload);
      });
  },
});

export const { clearUser } = authSlice.actions;

export default authSlice.reducer;