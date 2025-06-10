import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { token, URL } from '../../Url/url';
import toast from 'react-hot-toast';
import { fetchAreas } from '../Area/area';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (_, {rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}country`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });      
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCities = createAsyncThunk(
    'cities/fetchCities',
    async ({ countryId }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${URL}city/${countryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });        
        return { countryId, cities: response.data.data };
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const postArea = createAsyncThunk(
    'area/postArea',
    async (formData, { rejectWithValue , dispatch}) => {
      try {
        const response = await axios.post(`${URL}area`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        dispatch(fetchAreas());
        return response.data; // Return the response if needed
      } catch (err) {
        return rejectWithValue(err.response?.data || 'An error occurred');
      }
    }
  );

  export const fetchArea = createAsyncThunk(
    'area/fetchArea',
    async ({ citeId }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${URL}area/${citeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });        
        return { citeId, area: response.data.data };
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  



const countriesSlice = createSlice({
  name: 'countries',
  initialState : {
    countries: [],
    cities:{}, 
    area:{},
    status: 'idle',
    error: null,
    postStatus: 'idle',
    postError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        const { countryId, cities } = action.payload;
        state.cities[countryId] = cities;
    })
      .addCase(fetchCities.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(postArea.pending, (state) => {
        state.postStatus = 'loading';
      })
      .addCase(postArea.fulfilled, (state) => {
        state.postStatus = 'succeeded';
        toast.success("Area added Successfully")
      })
      .addCase(postArea.rejected, (state, action) => {
        state.postStatus = 'failed';
        state.postError = action.payload;
      })
      .addCase(fetchArea.fulfilled, (state, action) => {
        const { citeId, area } = action.payload;
        state.area[citeId] = area;
    })
      .addCase(fetchArea.rejected, (state, action) => {
        state.error = action.payload;
      })
  },
});

export default countriesSlice.reducer;
