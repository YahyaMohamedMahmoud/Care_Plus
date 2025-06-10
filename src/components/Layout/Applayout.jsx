import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import { useState } from "react";

const Applayout = () => {
  const location = useLocation();
  const [toggleSide, setToggleSide] = useState(true);
  return (
    <div className="flex gap-1 h-[90vh] py-[25px]">
      <div className=" pl-[10px]    ">
        <Sidebar toggleSide={toggleSide} />
      </div>
      <div className="h-[85vh] flex-grow-1  grid grid-cols-12    w-full">
        {/* <div className=" col-span-1"></div> */}
        <div className=" col-span-12   w-[100%]">
          <div className=" px-[10px]  mb-1  w-full">
            <Navbar setToggleSide={setToggleSide} />
          </div>
          <main
            className={`w-full h-[85vh] overflow-y-auto ps-3 ${
              (location.pathname.startsWith("/offers") &&
                location.pathname !== "/offers") ||
              (location.pathname.startsWith("/customers") &&
                location.pathname !== "/customers")
                ? "pr-[5px]"
                : "px-[9px] "
            }  `}
          >
            <Outlet />
          </main>
          {/* <div className=" col-span-1"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Applayout;
