import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./authReducer";
import { supabase } from "../utils/supabase";
import { getProfile, signInWithEmail } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const initialState = {
  session: null,
  profile: null,
  isLoading: false,
};

export function AuthContextProvider({ children }) {
  const [authState, authDispatch] = useReducer(AuthReducer, initialState);
  const navigate = useNavigate("");

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session) {
          authDispatch({ type: "USER_LOG_OUT" });
          return;
        }

        if (!authState.profile) {
          const profile = await getProfile(session.user.id);

          authDispatch({
            type: "USER_LOG_IN",
            payload: {
              session,
              profile,
            },
          });
        }
      },
    );
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  async function handleLoginUser(email) {
    await signInWithEmail(email);
  }

  async function handleLogoutUser() {
    await supabase.auth.signOut();
    navigate("/");
  }

  const authContextValue = {
    session: authState.session,
    profile: authState.profile,
    loginUser: handleLoginUser,
    logoutUser: handleLogoutUser,
  };

  return <AuthContext value={authContextValue}>{children}</AuthContext>;
}
