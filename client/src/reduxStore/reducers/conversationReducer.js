import * as types from "reduxStore/constants/conversationConstants";
import { SIGN_OUT } from "reduxStore/rconstants/authConstants";
import { remove } from "utils/remove";
const initState = {
  conversations: [],
  messages: [],
  errorConversations: null,
  selectedConversation: null,
  errorSelectedConversation: null,
};

const conversationReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_OUT:
      return {
        ...state,
        conversations: [],
        messages: [],
        errorConversations: null,
        selectedConversation: null,
        errorSelectedConversation: null,
      };
    case types.GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversations: payload ? payload.conversations : null,
        errorConversations: null,
      };

    case types.GET_CONVERSATION_FAIL:
      return {
        ...state,
        conversations: [],
        errorConversations: payload ? payload : "Something went wrong",
      };

    case types.GET_SINGLE_SUCCESS:
      return {
        ...state,
        selectedConversation: payload
          ? {
              _id: payload._id,
              friend: payload._friend,
            }
          : null,
        messages: payload ? payload.messages : [],
        errorSelectedConversation: null,
      };

    case types.DELETE_MESSAGE_FAIL:
    case types.EDIT_MESSAGE__FAIL:
    case types.SEND_MESSAGE_FAIL:
    case types.CLEAR_CONVERSATION_FAIL:
    case types.SEEN_MESSAGE_FAIL:
    case types.GET_SINGLE_CONVERSATION_FAIL:
      return {
        ...state,
        messages: [],
        errorSelectedConversations: payload ? payload : "Somethig went wrong",
        selectedConversation: null,
      };

    case types.CLEAR_CONVERSATION_SUCCESS:
      return {
        ...state,
        selectedConversation: null,
        conversations: remove(state.conversations, payload._id),
        messages: [],
        errorConversations: null,
        errorSelectedConversation: null,
      };

    case types.CLOSE_CONVERSATION:
      return {
        ...state,
        selectedConversation: null,
        messages: [],
        errorSelectedConversation: null,
      };

    case types.CLEAR_ERRORS:
      return {
        ...state,
        errorConversations: null,
        errorSelectedConversation: null,
      };
  }
};

export default conversationReducer;
