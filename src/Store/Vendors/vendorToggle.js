import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { token, URL } from '../../Url/url';
import { fetchVendors } from './vendors';

export const Vendortoggle = createAsyncThunk(
  'vendor/Vendortoggle',
  async ({ vendorId, currentStatus }, { rejectWithValue, dispatch }) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    try {
      const response = await axios.patch(
        `${URL}vendor/toggle-status/${vendorId}`,
        { status: newStatus },
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      dispatch(fetchVendors())
      return { vendorId, newStatus }; 
      
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

const vendortoggleSlice = createSlice({
  name: 'vendor',
  initialState: {
    status: 'inactive', 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Vendortoggle.pending, (state) => {
        state.loading = true;
      })
      .addCase(Vendortoggle.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.newStatus;
      })
      .addCase(Vendortoggle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default vendortoggleSlice.reducer;
