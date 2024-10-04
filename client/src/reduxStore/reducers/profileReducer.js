import * as types from "reduxStore/constants/profileConstants";
import { SIGN_OUT } from "reduxStore/constants/authConstants";

const initState = {
  open: false,
  profile: null,
  isUser: false,
};

const profileReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_OUT:
      return {
        ...state,
        open: false,
        profile: null,
        isUser: null,
      };

    case types.OPEN_SIDEBAR:
      return {
        ...state,
        open: true,
        profile: payload,
        isUser: false,
      };

    case types.USER_SIDEBAR:
      return {
        ...state,
        open: true,
        profile: payload ? payload : null,
        isUser: true,
      };

    case types.CLOSE_SIDEBAR:
      return {
        ...state,
        open: false,
        profile: null,
        isUser: false,
      };

    default:
      state;
  }
};

export default profileReducer;
