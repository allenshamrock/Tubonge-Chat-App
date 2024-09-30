import * as types from "reduxStore/constants/authConstants";
const initState = {
  user: null,
  accessToken: null,
  refereshToken: null,
  errorMessage: null,
  successMessage: null,
};

const authReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        successMessage: payload ? payload : null,
      };

    case types.SIGN_UP_FAIL:
      return {
        ...state,
        errorMessage: payload ? payload : null,
      };

    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: payload ? payload.user : null,
        accessToken: payload ? payload.accessToken : null,
        refreshToken: payload ? payload.refreshToken : null,
        errorMessage: null,
      };

    case types.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload ? payload.user : null,
        accessToken: payload ? payload.accessToken : null,
        refreshToken: payload ? payload.refreshToken : null,
        errorMessage: null,
      };

    case types.DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        errorMessage: null,
        successMessage: payload ? payload.message : null,
      };

    case types.SIGN_IN_FAIL:
      return {
        ...state,
        errorMessage: payload ? payload.message : null,
        successMessage: null,
      };

    case types.EDIT_PROFILE_FAIL:
      return {
        ...state,
        errorMessage: payload ? payload.message : null,
      };

    case types.DELETE_PROFILE_FAIL:
      return {
        ...state,
        errorMessage: payload ? payload.message : null,
      };

    case types.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: payload ? payload.accessToken : null,
        refreshToken: payload ? payload.refreshToken : null,
      };

    case types.REFRESH_TOKEN_FAIL:
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        errorMessage: null,
        successMessage: null,
      };

    case types.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload ? payload.accessToken : null,
      };

    case types.SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: payload ? payload.refreshToken : null,
      };

    case types.SET_USER_DATA:
      return {
        ...state,
        user: payload ? payload.user : null,
      };

    case types.SIGN_OUT:
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        errorMessage: null,
        successMessage: null,
      };

    case types.CLEAR_MESSAGES:
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
      };

    default:
      state;
  }
};

export default authReducer;
