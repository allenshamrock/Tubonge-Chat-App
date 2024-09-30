import * as types from "reduxStore/constants/friendsConstants";
import { SIGN_OUT } from "reduxStore/constants/authConstants";
import { remove } from "utils/remove";

const initState = {
  userFriends: [],
  newFriends: [],
  friendRequests: [],
  searchFriends: null,
  errorMessage: null,
};

const friendReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_OUT:
      return {
        ...state,
        userFriends: [],
        newFriends: [],
        friendRequests: [],
        searchFriends: null,
        errorMessage: null,
      };

    case types.GET_FRIENDS_SUCCESS:
      return {
        ...state,
        userFriends: payload ? payload : [],
        newFriends: [],
        errorMessage: null,
      };

    case types.BLOCK_FRIENDS_SUCCESS:
      return {
        ...state,
        userFriends: remove(state.userFriends, payload),
        newFriends: remove(state.newFriends, payload),
        friendRequests: remove(state.friendRequests, payload),
        errorMessage: null,
      };

    case types.REMOVE_FRIEND_SUCCESS:
      return {
        ...state,
        userFriends: remove(state.userFriends, payload),
        errorMessage: null,
      };

    case types.REMOVE_FRIEND_FAIL:
    case types.BLOCK_FRIEND_FAIL:
    case types.UNBLOCK_FRIEND_FAIL:
    case types.GET_FRIENDS_FAIL:
      return {
        ...state,
        userFriends: [],
        errorMessage: payload ? payload : "Something went wrong",
      };

    case types.GET_NEW_FRIENDS_SUCCESS:
      return {
        ...state,
        newFriends: payload ? payload : null,
        userFriends: [],
        errorMessage: null,
      };

    case types.GET_NEW_FRIENDS_FAIL:
      return {
        ...state,
        errorMessage: payload ? payload : "Something went wrong",
        newFriends: [],
      };

    case types.SERACH_FRIENDS_SUCCESS:
      return {
        ...state,
        searchFriends: payload ? payload : null,
        errorMessage: null,
      };

    case types.SEARCH_FRIENDS_FAIL:
      return {
        ...state,
        searchFriends: null,
        errorMessage: payload ? payload : null,
      };

    case types.CLEAR_SEARCH_FRIENDS:
      return {
        ...state,
        searchFriends: null,
        errorMessage: null,
      };

    case types.ACCEPT_FRIEND_REQUEST_SUCCESS:
    case types.REJECT_FRIEND_REQUEST_SUCCESS:
    case types.GET_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friendRequests: payload ? payload : [],
        errorMessage: null,
      };

    case types.SEND_FRIEND_REQUEST_FAIL:
    case types.ACCEPT_FRIEND_REQUEST_FAIL:
    case types.REJECT_FRIEND_REQUEST_FAIL:
    case types.GET_FRIENDS_REQUEST_FAIL:
      return {
        ...state,
        friendRequests: [],
        errorMessage: payload ? payload : null,
      };

    default:
      state;
  }
};

export default friendReducer;
