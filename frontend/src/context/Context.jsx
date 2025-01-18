import { createContext, useContext } from "react";

import { useState } from "react";
import { useAuth } from "./AuthContext";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const { isAUthenticated, setIsAuthenticated } = useAuth();
  const [user, setuser] = useState(isAUthenticated);
  return (
    <Context.Provider value={{ user, setuser }}>{children}</Context.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(Context);
};
