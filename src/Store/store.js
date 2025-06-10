import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/loginUser"; 
import offersReducer from "./Offers/offers"; 
import toggleSlice from "./Offers/statustoggle"; 
import usersReducer from "./Users/users"; 
import teamsReducer from "./Teams/teams"; 
import vendorsSlice from "./Vendors/vendors";
import AllvendorsSlice from "./Offers/getVendors";
import vendortoggleSlice from "./Vendors/vendorToggle";
import countriesSlice from "./Origins/origins";
import bannersSlice from "./Slider/slider";
import areasSlice from "./Area/area";
import dashboardReducer from "./Dashboard/dashboard";

const store = configureStore({
  reducer: {
    auth: authReducer,
    offers: offersReducer,
    statustoogle : toggleSlice,
    users: usersReducer,
    teams: teamsReducer,
    vendors : vendorsSlice,
    allVendors : AllvendorsSlice,
    vendorToggle : vendortoggleSlice,
    countries: countriesSlice,
    banners : bannersSlice,
    area : areasSlice,
    dashboard: dashboardReducer,
  },
});

export default store;
