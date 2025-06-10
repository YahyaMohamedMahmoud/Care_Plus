
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { token, URL } from '../../Url/url';
import toast from 'react-hot-toast';


export const fetchAdmins = createAsyncThunk('teams/fetchAdmins', async (search) => {
    
  try {
    const response = await axios.get(`${URL}admins`,{
        params: {
          search: search,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data.data; 
  } catch (error) {
    return error.message;
  }
});

export const addTeamMember = createAsyncThunk(
    'team/addTeamMember',
    async (teamData, { rejectWithValue , dispatch }) => {
      try {
        const response = await axios.post(`${URL}admin/register`, teamData ,{
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
              },
        });
        toast.success('Team member added successfully!');  
        dispatch(fetchAdmins())
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// Slice to handle teams state
const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    admins: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      builder
      .addCase(addTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Team member added successfully!';
        // state.admins.push(action.payload);
      })
      .addCase(addTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Something went wrong';
      })    
  },
});

export default teamsSlice.reducer;
