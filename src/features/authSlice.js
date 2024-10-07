import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
  const response = await axios.post('https://expense-tracker-be-hq67.onrender.com/api/auth/login', userData);
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
