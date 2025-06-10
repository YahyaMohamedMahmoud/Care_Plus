import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { token, URL } from "../../Url/url";
import axios from "axios";

export const fetchBanners = createAsyncThunk(
  "banners/fetchBanners",
  async () => {
    try {
      const response = await axios.get(`${URL}banner`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data.banner;
    } catch (error) {
      let errorMessage = "An error occurred while fetching banners";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message;
      }
    }
  }
);

export const deleteBanner = createAsyncThunk(
    'banner/deleteBanner',
    async (bannerId, { rejectWithValue, dispatch }) => {
      try {
        await axios.delete(`${URL}banner/${bannerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(fetchBanners()); 
        return bannerId; 
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
);

export const addBanner = createAsyncThunk(
    'banners/addBanner',
    async (bannerData, { rejectWithValue , dispatch}) => {
      try {
        const response = await axios.post(`${URL}banner`, bannerData, {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });
        dispatch(fetchBanners()); 
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message); 
      }
    }
  );

  export const updateBanner = createAsyncThunk(
    "banners/updateBanner",
    async ({ id, formData }, { rejectWithValue, dispatch }) => {
      try {
        const response = await axios.post(`${URL}banner/update/${id}`, formData, {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(fetchBanners());
        dispatch(addBanner())   
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update banner");
      }
    }
  );
  
  
  const bannersSlice = createSlice({
  name: "banners",
  initialState: {
    banners: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      builder
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = state.banners.filter((banner) => banner.id !== action.payload);
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      builder
      .addCase(addBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners.push(action.payload); // Add the new banner to the state
      })
      .addCase(addBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      builder
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBanner = action.payload;        
        const index = state.banners.findIndex((banner) => banner.id === updatedBanner.id);
        if (index !== -1) {
          state.banners[index] = updatedBanner; 
        }
      })
      
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update banner";
      })
  },
});
export default bannersSlice.reducer;
