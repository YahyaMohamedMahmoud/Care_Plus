import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token, URL } from "../../Url/url";
import toast from "react-hot-toast";

export const exportPDF = createAsyncThunk(
    "invoices/exportPDF",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        });
  
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "invoices.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success("PDF Downloaded Successfully!");
        return "PDF Downloaded Successfully!";

      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  
  // Slice to handle export PDF state
  const exportSlice = createSlice({
    name: "exportPDF",
    initialState: {
      loading: false,
      error: null,
      successMessage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(exportPDF.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.successMessage = null;
        })
        .addCase(exportPDF.fulfilled, (state, action) => {
          state.loading = false;
          state.successMessage = action.payload;
        })
        .addCase(exportPDF.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default exportSlice.reducer;