import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { token, URL } from '../../Url/url';
import toast from 'react-hot-toast';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (filters = {}) => {

    const { status, type_id, search, model_id , page = 1 } = filters;

    try {
      const { data } = await axios.get(`${URL}users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: status || undefined,  
          type_id: type_id || undefined,
          search: search || undefined, 
          model_id: model_id || undefined,  
          page 
        },
      });
    
      return {
        users: data.data.data,
        currentPage: data.data.current_page,
        totalPages: data.data.last_page,  // Assuming last_page is the total pages
      };
      
    } catch (error) {
      let errorMessage = "An error occurred while fetching users";

      if (error.response) {
        errorMessage = error.data.data.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message;
      }
      return Promise.reject(errorMessage);
    }
  }
);

export const setValidDate = createAsyncThunk(
  'validDate/setValidDate',
  async ({ id, validDate } , {dispatch}) => {
    try{
      const response = await axios.post(
        `${URL}set-valid/${id}`,
        { valid: validDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchUsers());
      return response.data;
    }
    catch(error){
      toast.error("The Date must be a date after today")
    }
  }
);

// Create a slice to handle user state
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    data: null,
    errors:null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      builder
      .addCase(setValidDate.pending, (state) => {
        state.loading = true;
      })
      .addCase(setValidDate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(setValidDate.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error.message;
      });
  },
});

export default usersSlice.reducer;
