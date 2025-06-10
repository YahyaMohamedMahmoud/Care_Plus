import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { token, URL } from '../../Url/url';

export const fetchAllvendors = createAsyncThunk('getvendors/fetchAllvendors', async () => {
    try {
      const response = await axios.get(`${URL}all/vendors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.response || error.message;
    }
  });


  const AllvendorsSlice = createSlice({
    name: 'getvendors',
    initialState: {
      allVendors: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllvendors.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAllvendors.fulfilled, (state, action) => {
          state.loading = false;
          state.allVendors = action.payload;
        })
        .addCase(fetchAllvendors.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default AllvendorsSlice.reducer;