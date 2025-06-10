import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { token, URL } from "../../Url/url";
import axios from "axios";
import { fetchDashboardData } from "../Dashboard/dashboard";

export const fetchOffers = createAsyncThunk(
  "offers/fetchOffers",
  async () => {
    try {
      const {data} = await axios.get(`${URL}offers/all/admin`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      return data.data;
    } catch (error) {
      let errorMessage = "An error occurred while fetching offers";

      if (error.response) {
        errorMessage = error.data.data.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message;
      }
    }
  }
);

export const deleteOffer = createAsyncThunk(
    'offer/deleteOffer',
    async (offerId, { rejectWithValue, dispatch }) => {
      try {
        await axios.delete(`${URL}offers/${offerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(fetchOffers()); 
        dispatch(fetchDashboardData())
        return offerId; 
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
);

export const addOffer = createAsyncThunk(
    'offers/addOffer',
    async (offerData, { rejectWithValue , dispatch}) => {
      try {
        const response = await axios.post(`${URL}offer`, offerData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, 
          },
        });
        dispatch(fetchOffers()); 
        dispatch(fetchDashboardData())
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message); 
      }
    }
  );

  export const updateOffer = createAsyncThunk(
    "offers/updateOffer",
    async ({ id, formData }, { rejectWithValue, dispatch }) => {
      try {
        const response = await axios.post(`${URL}offers/${id}`, formData, {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(fetchOffers());
        dispatch(addOffer())   
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update offer");
      }
    }
  );



const offersSlice = createSlice({
  name: "offers",
  initialState: {
    offers: [],
    loading: false,
    error: null,
  },
  reducers: {
    addOfferOptimistic(state, action) {
      state.offers.push(action.payload); // Optimistic update
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      builder
      .addCase(deleteOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = state.offers.filter((offer) => offer.id !== action.payload);
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      builder
      .addCase(addOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offers.push(action.payload); // Add the new offer to the state
      })
      .addCase(addOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      builder
      .addCase(updateOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOffer = action.payload;        
        const index = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
        if (index !== -1) {
          state.offers[index] = updatedOffer; // Update the offer in the state
        }
      })
      
      .addCase(updateOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update offer";
      })
  },
});
export const { addOfferOptimistic } = offersSlice.actions;
export default offersSlice.reducer;
