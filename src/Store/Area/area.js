import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { token, URL } from "../../Url/url";
import axios from "axios";

export const fetchAreas = createAsyncThunk(
  "areas/fetchAreas",
  async () => {
    try {
      const { data } = await axios.get(`${URL}all/area`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
   
      return data.data;
    } catch (error) {
      let errorMessage = "An error occurred while fetching areas";

      if (error.response) {
        errorMessage = error.response.data.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }
);

export const deleteArea = createAsyncThunk(
  "area/deleteArea",
  async (areaId, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${URL}area/${areaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchAreas());
      return areaId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateArea = createAsyncThunk(
  "areas/updateArea",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(`${URL}area/${id}`, formData, {
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchAreas());

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update area");
    }
  }
);

const areasSlice = createSlice({
  name: "areas",
  initialState: {
    areas: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.loading = false;
        state.areas = action.payload;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteArea.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteArea.fulfilled, (state, action) => {
        state.loading = false;
        state.areas = state.areas.filter((area) => area.id !== action.payload);
      })
      .addCase(deleteArea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    builder
      .addCase(updateArea.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArea.fulfilled, (state, action) => {
        state.loading = false;
        const updatedArea = action.payload;
        const index = state.areas.findIndex((area) => area.id === updatedArea.id);
        if (index !== -1) {
          state.areas[index] = updatedArea; // Update the area in the state
        }
      })
      .addCase(updateArea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update area";
      });
  },
});

export default areasSlice.reducer;
