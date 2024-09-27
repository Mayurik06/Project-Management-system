import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

function Sidebar({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/logout', {}, { withCredentials: true });
      
      if (response.status === 200) {
        console.log("Logged out successfully");
        navigate('/'); // Redirect to login page
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error.response.data);
    }
  };

  return (
    <div className="h-screen">
      <div className="h-screen flex flex-col justify-between items-center w-[58px] py-16 absolute top-0 left-0 bottom-0 bg-white">
        <div className="h-[718px] flex flex-col justify-center">
          <div className="h-[50%] flex flex-col items-center justify-end gap-10 border-b border-b-[#979797] pb-10">
            <div>
              <NavLink to="/dashboard">
                {({ isActive }) => (
                  <img
                    src={isActive ? "/Dashboard-active.svg" : "/Dashboard.svg"}
                    alt="Dashboard"
                    
                  />
                )}
              </NavLink>
            </div>

            <div>
              <NavLink to="/projectListing">
                {({ isActive }) => (
                  <img
                    src={isActive ? "/Project-list-active.svg" : "/Project-list.svg"}
                    alt="Project List"
                  />
                )}
              </NavLink>
            </div>
          </div>
          <div className="flex items-start justify-between h-[50%] pt-10">
            <div>
              <NavLink to="/createProject">
                {({ isActive }) => (
                  <img
                    src={isActive ? "/create-project-active.svg" : "/create-project.svg"}
                    alt="Create Project"
                  />
                )}
              </NavLink>
            </div>
          </div>
          <div>
            <button onClick={handleLogout}>
              <img src="/Logout.svg" alt="Logout" />
            </button>
          </div>
        </div>
      </div>
      <main className="ml-20 mr-6 mt-32 mb-6">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;
