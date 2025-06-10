import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "../../Url/url";


export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}admin/login`, { email, password });
      
      if (response.status === 200 && response.data?.data?.token && response.data?.data?.admin) {
        const token = response.data.data.token;
        const adminData = response.data.data.admin;
        localStorage.setItem("access_token", token);
        localStorage.setItem("admin", JSON.stringify(adminData));

        return adminData; 
      } 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Login failed");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("admin");
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle adminLogin actions
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        if(state.admin === undefined){
          toast.error("Login failed")  
        }else{
          toast.success("Login successful");
        }
        
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
