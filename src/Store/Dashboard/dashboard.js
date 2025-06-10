import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token, URL } from "../../Url/url";

export const fetchDashboardData = createAsyncThunk(
    "dashboard/fetchDashboardData",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${URL}dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
