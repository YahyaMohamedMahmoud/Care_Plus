import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { token, URL } from '../../Url/url';
import { fetchOffers } from './offers';
import { fetchDashboardData } from '../Dashboard/dashboard';

export const toggleOfferStatus = createAsyncThunk(
  'offer/toggleStatus',
  async ({ offerId, currentStatus }, { rejectWithValue, dispatch }) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    try {
      const response = await axios.patch(
        `${URL}offers/toggle-status/${offerId}`,
        { status: newStatus },
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      dispatch(fetchDashboardData())
      dispatch(fetchOffers())
      return { offerId, newStatus }; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

const toggleSlice = createSlice({
  name: 'offer',
  initialState: {
    status: 'inactive', 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleOfferStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleOfferStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.newStatus;
      })
      .addCase(toggleOfferStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default toggleSlice.reducer;
