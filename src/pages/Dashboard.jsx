import MainCard from "./Dashboard/MainCard";
import Chart from "./Dashboard/Chart";
import AboutUsers from "./Dashboard/AboutUsers";
import AboutCard from "./Dashboard/AboutCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDashboardData } from "../Store/Dashboard/dashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.dashboard);
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, status]);

  
  return (
    <div className="mt-2 me-2">
      <div className="grid grid-cols-2 gap-2">
        <MainCard data={data}/>

        <div className="chart">
          <Chart data={data}/>
        </div>
      </div>
      <div className="chart grid grid-cols-2 gap-2 my-3">
        <AboutUsers data={data}/>
        <AboutCard data={data}/>
      </div>
    </div>
  );
};

export default Dashboard;
