/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(() =>
    localStorage.getItem("jwtToken")
  );
  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    jwtToken ? true : false
  );

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
    setJwtToken(token);
  };

  const clearToken = () => {
    setJwtToken("");
    localStorage.removeItem("jwtToken");
  };

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  return (
    <AuthContext.Provider
      value={{ jwtToken, setToken, clearToken, headers, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
