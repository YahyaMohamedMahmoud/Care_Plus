import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Applayout from "./components/Layout/Applayout";
import { Toaster } from "react-hot-toast";

// Lazy load routes
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Home = React.lazy(() => import("./pages/Home"));
const Offers = React.lazy(() => import("./pages/Offers/Offers"));
const Users = React.lazy(() => import("./pages/Users/Users"));
const Teams = React.lazy(() => import("./pages/Teams/Teams"));
const AddTeamTarget = React.lazy(() => import("./pages/Teams/AddTeamTarget"));
const Vendors = React.lazy(() => import("./pages/Vendors/Vendors"));
const Area = React.lazy(() => import("./pages/Area/Area"));
const Slider = React.lazy(() => import("./pages/Silder/Slider"));

import Protection from "./Protection";
import Loader from './components/Layout/Loader';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <Protection>
                <Applayout />
              </Protection>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Loader/>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="dashboard"
              element={
                <Suspense fallback={<Loader/>}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="offers"
              element={
                <Suspense fallback={<Loader/>}>
                  <Offers />
                </Suspense>
              }
            />
            <Route
              path="users"
              element={
                <Suspense fallback={<Loader/>}>
                  <Users />
                </Suspense>
              }
            />

            {/* Nested Routes for Teams */}
            <Route
              path="teams"
              element={
                <Suspense fallback={<Loader/>}>
                  <Teams />
                </Suspense>
              }
            >
              <Route
                path="addteam"
                element={
                  <Suspense fallback={<Loader/>}>
                    <AddTeamTarget />
                  </Suspense>
                }
              />
            </Route>
  
               <Route
              path="vendors"
              element={
                <Suspense fallback={<Loader/>}>
                  <Vendors />
                </Suspense>
              }
            />    
               <Route
              path="area"
              element={
                <Suspense fallback={<Loader/>}>
                  <Area />
                </Suspense>
              }
            />   
               <Route
              path="addslider"
              element={
                <Suspense fallback={<Loader/>}>
                  <Slider />
                </Suspense>
              }
            />   


          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </>
  );
}

export default App;
