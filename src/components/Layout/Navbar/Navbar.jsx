// import { PiBellSimpleRingingFill } from "react-icons/pi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
      
  return (
    <div className="flex items-end justify-end w-[99%] bg-white px-[35px] py-[14px] shadow-card rounded-[18px]">

      {/* Right Section */}
      <div className="flex items-center gap-[66px] text-gray-700">
        {/* Middle Section */}
        {/* <button className="flex items-center gap-1 text-lg">
        <img
        loading="lazy"
          alt="United States"
          src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"/>
        EN
        </button>
        <button>

          <PiBellSimpleRingingFill className="text-[20px] cursor-pointer hover:text-primary" />
        </button> */}
        <Link
          // to="/"
          className="flex items-center text-left space-x-2">
          <div className=" relative rounded-full">
            <HiMiniUserCircle className="text-4xl  bg-white rounded-full   mx-auto " />
          </div>
          <div className="leading-tight">
      <div className="font-bold">{user?.first_name} {user?.last_name}</div>
      <div className="text-[15px] font-light">
        {user?.role === "admin" ? "Admin" : "User"}
      </div>
    </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
