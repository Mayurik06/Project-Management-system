import React, { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("accessToken") ? true : false;
  });

  const login = (accessToken,refreshToken) => {

    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken); 
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");  // Remove token on logout
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the Auth context
export function useAuth() {
  return useContext(AuthContext);
}
