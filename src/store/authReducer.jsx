export function AuthReducer(state, action) {
  switch (action.type) {
    case "USER_LOG_IN": {
      return {
        session: action.payload.session,
        profile: action.payload.profile,
        isLoading: false,
      };
    }
    case "USER_LOG_OUT": {
      return {
        session: null,
        profile: null,
        isLoading: false,
      };
    }
    case "USER_UPDATE": {
      return {
        ...state,
        profile: action.payload.profile,
      };
    }
    case "USER_PROFILE_LOADING": {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
}
