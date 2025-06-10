import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { token, URL } from "../../Url/url";
import axios from "axios";

export const fetchVendors = createAsyncThunk(
  "vendors/fetchVendors",
  async () => {    
    try {
      // Make the API request using axios
      const {data} = await axios.get(`${URL}vendors`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      
      return data.data;

    } catch (error) {
      let errorMessage = "An error occurred while fetching vendors";

      if (error.response) {
        errorMessage = error.data.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message;
      }
    }
  }
);

export const deleteVendor = createAsyncThunk(
    'vendors/deleteVendor',
    async (vendorId, { rejectWithValue, dispatch }) => {  
      try {
        await axios.delete(`${URL}vendor/delete/${vendorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(fetchVendors()); 
        return vendorId; 
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
);

export const addVendor = createAsyncThunk(
    'vendors/addVendor',
    async (vendorData, { rejectWithValue , dispatch}) => {
  
      try {
        const response = await axios.post(`${URL}vendor/create`, vendorData, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, 
          },
        });
        dispatch(fetchVendors()); 
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message); 
      }
    }
  );

  export const updateVendor = createAsyncThunk(
    "vendors/updateVendor",
    async ({ id, formData }, { rejectWithValue, dispatch }) => {
      try {
        const response = await axios.post(`${URL}vendor/update/${id}`, formData, {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(fetchVendors());
        dispatch(addVendor())
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update offer");
      }
    }
  );



const vendorsSlice = createSlice({
  name: "vendors",
  initialState: {
    vendors: [],
    loading: false,
    error: null,
  },
  reducers: {
    addvendorOptimistic(state, action) {
      state.vendors.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      builder
      .addCase(deleteVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = state.vendors.filter((vendor) => vendor.id !== action.payload);
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      builder
      .addCase(addVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors.push(action.payload); // Add the new offer to the state
      })
      .addCase(addVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      builder
      .addCase(updateVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.loading = false;
        const updateVendor = action.payload;        
        const index = state.vendors.findIndex((vendor) => vendor.id === updateVendor.id);
        if (index !== -1) {
          state.vendors[index] = updateVendor; // Update the offer in the state
        }
      })
      
      .addCase(updateVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update offer";
      })
  },
});
export const { addvendorOptimistic } = vendorsSlice.actions;
export default vendorsSlice.reducer;