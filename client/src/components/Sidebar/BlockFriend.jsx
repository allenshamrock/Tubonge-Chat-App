import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import Button from "components/common/Button";
import { clearConversationAction } from "reduxStore/actions/clearConversationAction";
import {
  blockFriendAction,
  unblockFriendAction,
} from "reuxStore/actions/FriendAction";

const BlockFriend = ({ friend }) => {
  const dispatch = useDispatch();

  const conversations = useSelector(
    (state) => state.conversations.conversations
  );
  const friendConversation = conversations?.find(
    (conversation) => conversation.friend._id === friend._id
  );

  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBlockFriend = async () => {
    setLoading(true);
    await dispatch(blockFriendAction(friend._id));
    if (friendConversation) {
      await dispatch(clearConversationAction(friend._id));
    }
    setLoading(false);
    setBlocked(true);
  };

  const handleUnblockFriend = async () => {
    setLoading(true);
    await dispatch(unblockFriendAction(friend._id));
    setLoading(false);
    setBlocked(false);
  };

  const buttonText = loading ? (
    <ClipLoader size={17} color="white" />
  ) : blocked ? (
    `Unblock ${friend?.name}`
  ) : (
    `Block ${friend?.name}`
  );
  return (
    <Button
      variant="danger"
      disabeled="loading"
      onClick={blocked ? handleBlockFriend : handleUnblockFriend}
    >
      {buttonText}
    </Button>
  );
};

export default BlockFriend;
