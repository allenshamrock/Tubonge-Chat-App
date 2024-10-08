import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import { removeFriendAction } from "reduxStore/actions/friendsAction";
import { clearConversationAction } from "reduxStore/actions/conversationAction";

const RemoveFriendModal = (friendId, conversationId, open, onClose) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleBlockFriend = async () => {
    setLoading(true);
    await dispatch(removeFriendAction(friendId));
    if (conversationId) await dispatch(clearConversationAction(conversationId));
    setLoading(false);
  };
  return (
    <Modal open={open} onClose={onClose}>
      {!loading && (
        <>
          <h1 className="text-white text-md font-semibold mb-6">
            Are you sure tou want to unfollow this profile?
          </h1>
          <div className="flex items-center gap-4">
            <Button diabled={loading} variant="danger" onclick={onClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={loading}
              onclick={handleBlockFriend}
            >
              Unfollow profile
            </Button>
          </div>
        </>
      )}
      {loading && <ClipLoader color="white"/>}
    </Modal>
  );
};

export default RemoveFriendModal;
