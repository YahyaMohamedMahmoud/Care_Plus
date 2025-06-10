import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token, URL } from "../../Url/url";

export const fetchInvoices = createAsyncThunk(
    "invoices/fetchInvoices",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${URL}invoices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  const invoicesSlice = createSlice({
    name: "invoices",
    initialState: {
      invoices: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchInvoices.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchInvoices.fulfilled, (state, action) => {
          state.loading = false;
          state.invoices = action.payload;
        })
        .addCase(fetchInvoices.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default invoicesSlice.reducer;