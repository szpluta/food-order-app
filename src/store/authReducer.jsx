export function AuthReducer(state, action) {
  switch (action.type) {
    case "USER_LOG_IN": {
      console.log({
        session: action.payload.session,
        profile: action.payload.profile,
        isLoading: false,
      });
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
    default:
      return state;
  }
}
