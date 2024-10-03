import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

function Sidebar({ children }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Check screen size initially

  // Function to check the screen size and update the state
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768); // Mobile if screen width is less than 768px
  };

  // Add event listener for resizing
  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://projectmangerbackend.onrender.com/api/logout",
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

  // Render Mobile or Desktop sidebar based on screen size
  return (
    <div className="h-screen">
      {isMobile ? (
        // Mobile layout
        <div>
          <div className="fixed bottom-0 left-0 right-0 h-[58px] bg-white z-20 flex flex-col justify-center rounded-tl-[30px] rounded-tr-[30px]">
            <div className="flex items-center justify-evenly">
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
                <NavLink to="/createProject">
                  {({ isActive }) => (
                    <img
                      src={
                        isActive
                          ? "/create-project-active.svg"
                          : "/create-project.svg"
                      }
                      alt="Create Project"
                    />
                  )}
                </NavLink>
              </div>

              <div>
                <NavLink to="/projectListing">
                  {({ isActive }) => (
                    <img
                      src={
                        isActive
                          ? "/Project-list-active.svg"
                          : "/Project-list.svg"
                      }
                      alt="Project List"
                    />
                  )}
                </NavLink>
              </div>
            </div>
          </div>
          <main className=" mt-16 md:mt-28 mb-[58px]">{children}</main>
        </div>
      ) : (
        // Desktop layout
        <div>
        <div className="h-screen flex flex-col justify-between items-center w-[58px] py-16 fixed top-0 left-0 bottom-0 bg-white">
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
                      src={
                        isActive
                          ? "/Project-list-active.svg"
                          : "/Project-list.svg"
                      }
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
                      src={
                        isActive
                          ? "/create-project-active.svg"
                          : "/create-project.svg"
                      }
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
        <main className="ml-20 mr-6 mt-16 md:mt-28 mb-6">{children}</main>
        </div>
      )}
     
    </div>
  );
}

export default Sidebar;
