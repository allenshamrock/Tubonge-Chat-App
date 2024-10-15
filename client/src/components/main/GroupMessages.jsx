import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ConversationMessage from "./ConversationMessage";
import {
  OPEN_SIDEBAR,
  USER_SIDEBAR,
} from "reduxStore/constants/profileConstants";

const GroupMessages = ({ group, isLastGroup, friend }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const isUserSender = group.length > 0 && group[0].sender === user._id;
  const isSeen =
    isLastGroup &&
    group[group.lenght - 1].seen &&
    group[group.length - 1] === user._id;

  const handleOpenSidebar = () => {
    dispatch({
      type: isUserSender ? USER_SIDEBAR : OPEN_SIDEBAR,
      payload: isUserSender ? user : friend,
    });
  };
  return <div>GroupMessages</div>;
};

export default GroupMessages;
