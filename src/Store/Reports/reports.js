import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token, URL } from "../../Url/url";

export const fetchCards = createAsyncThunk(
    "cards/fetchCards",
    async ({ page = 1, queryParams = {} }) => {
      const params = new URLSearchParams({
        page,
        ...queryParams,
      });
  
      try {
        const response = await axios.get(`${URL}cards?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw Error(error.message);
      }
    }
  );

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    data: [],
    currentPage: 1,
    totalPages: 1,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload?.data;
        state.currentPage = action.payload.data?.current_page;
        state.totalPages = action.payload.data?.last_page;   
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cardsSlice.reducer;
