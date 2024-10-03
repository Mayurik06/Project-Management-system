import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header({heading}) {
const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        console.log("Logged out successfully");
        navigate("/"); // Redirect to login page
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  return (
    <div className="md:absolute top-0 right-0 md:left-[58px] left-[0] fixed z-50 md:z-0">
      <div className="bg-[url('/Header-bg.svg')] md:h-[150px] bg-cover bg-center flex items-center md:justify-start justify-between px-4 py-4 rounded-bl-[30px] md:rounded-bl-none">
        <div className="md:flex-1 flex items-center gap-3">
          <img
            src="back arrow.svg"
            alt="back"
            className=" text-white font-bold"
          />
          <p className="text-xl line-clamp-[27px] text-white font-bold">
            {" "}
            {heading}
          </p>
        </div>
        <div className="md:flex-1 align-middle">
            <img src="Logo.svg" alt="logo" className="w-[60px] hidden md:block"/>
            <div className="block md:hidden">
            <LogoutIcon className=" text-white" onClick={handleLogout}/>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default Header;
