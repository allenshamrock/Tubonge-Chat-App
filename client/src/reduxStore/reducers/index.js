import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import conversationReducer from "./conversationReducer";
import profileReducer from "./profileReducer";
import friendReducer from "./friendReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  conversations: conversationReducer,
  profile: profileReducer,
  friends: friendReducer,
});

export default rootReducer;
