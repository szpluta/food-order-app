import { createContext } from "react";

export const AuthContext = createContext({
  session: null,
  profile: null,
  isLoading: true,
  loginUser: () => {},
  logoutUser: () => {},
  updateUser: () => {},
  reloadProfile: () => {},
});
