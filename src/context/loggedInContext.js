import { createContext } from "react";

export const LoggedInContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export default LoggedInContext;
