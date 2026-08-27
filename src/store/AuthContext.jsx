import { createContext } from "react";

export const AuthContext = createContext({
  session: null,
  profile: null,
  isLoading: false,
  loginUser: () => {},
  logoutUser: () => {},
});
