import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useState } from "react";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("accessToken") ? true : false;
  });

  if (!isAuthenticated) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/" />;
  }

  // If user is authenticated, render the child components (like Dashboard, etc.)
  return children;
}

export default ProtectedRoute;
