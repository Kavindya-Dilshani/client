import { createContext, useContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  signUp: () => {},
  logout: () => {},
  getUser: () => {},
});

export const useAuth = () => useContext(AuthContext);
