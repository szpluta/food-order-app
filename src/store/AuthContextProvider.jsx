import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./authReducer";
import { supabase } from "../utils/supabase";
import { getProfile, signInWithEmail } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { PROFILE_STATUS } from "../constans/profileStatus";
import { initialState } from "../constans/authInitialState";

export function AuthContextProvider({ children }) {
  const [authState, authDispatch] = useReducer(AuthReducer, initialState);
  const navigate = useNavigate();

  async function handleGetUserProfile(session) {
    authDispatch({ type: "USER_PROFILE_LOADING" });

    try {
      const profile = await getProfile(session.user.id);

      authDispatch({
        type: "USER_LOG_IN",
        payload: {
          session,
          profile: {
            ...profile,
            status: PROFILE_STATUS.SUCCESS,
          },
          isLoading: false,
        },
      });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      authDispatch({
        type: "USER_LOG_IN",
        payload: {
          session,
          profile: {
            status: PROFILE_STATUS.error,
          },
          isLoading: false,
        },
      });
    }
  }

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        authDispatch({ type: "USER_LOG_OUT" });
        return;
      }

      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        setTimeout(() => handleGetUserProfile(session), 0);
      }
    });
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

  function handleUpdateUser(profile) {
    authDispatch({
      type: "USER_UPDATE",
      payload: {
        profile,
      },
    });
  }

  const authContextValue = {
    session: authState.session,
    profile: authState.profile,
    loginUser: handleLoginUser,
    logoutUser: handleLogoutUser,
    updateUser: handleUpdateUser,
    reloadProfile: handleGetUserProfile,
    isLoading: authState.isLoading,
  };

  return <AuthContext value={authContextValue}>{children}</AuthContext>;
}
