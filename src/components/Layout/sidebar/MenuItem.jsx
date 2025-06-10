import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MenuItem = ({
  icon,
  label,
  toggleSide = true,
  to = "#",
  noPadding,
}) => {
  const location = useLocation();
  const [popup, setPopup] = useState(false);

  return (

    <Link
      to={to}
      onMouseLeave={() => setPopup(false)}
      onMouseEnter={() => setPopup(true)}
      className={`flex items-center relative px-3 ${
        noPadding ? " " : " pl-[27px] "
      } py-3 space-x-3 ${
        //  Color location
        location.pathname.includes(to)
          ? " hove:bg-white bg-white "
          : " "
      } cursor-pointer ${
        toggleSide ? " w-[90%] " : " justify-end w-[80%] "
      } rounded-r-[23px] h-[45px] hover:bg-white  bg-opacity-35 hover:bg-opacity-45 text-white   transition-colors`}>
      {/* Icon */}
      {icon && <div>{icon}</div>}

      {/* Show label when sidebar is grow */}
      {toggleSide && <div className=" text-[17px] leading-[25px]">{label}</div>}
    </Link>
  );
};

export default MenuItem;
