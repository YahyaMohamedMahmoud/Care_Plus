import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from '../components/Layout/Loader';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);
  return (
    <div className=" flex justify-center items-center  h-full w-full  ">
     <Loader/>
    </div>
  );
};

export default Home;
