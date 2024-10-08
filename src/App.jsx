import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import CreateProject from "./pages/CreateProject";
import ProjectListing from "./pages/ProjectListing";
import { AuthProvider } from "./pages/AuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* All protected routes */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <MainContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function MainContent() {
  const location = useLocation();
  const [heading, setHeading] = useState("Dashboard");

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setHeading("Dashboard");
        break;
      case "/createProject":
        setHeading("Create Project");
        break;
      case "/projectListing":
        setHeading("Project Listing");
        break;
      default:
        setHeading("Dashboard");
    }
  }, [location.pathname]);

  return (
    <div className="bg-[#F3F5F7]">
      <Sidebar>
        <Header heading={heading} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createProject" element={<CreateProject />} />
          <Route path="/projectListing" element={<ProjectListing />} />
        </Routes>
      </Sidebar>
    </div>
  );
}

export default App;
