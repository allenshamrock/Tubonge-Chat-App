import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import { blockFriendAction } from "reduxStore/actions/friendsActions";
import { clearConversationAction } from "reduxStore/actions/conversationActions";

const BlockFriendModal = ({ friendId, conversationId, open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleBlockFriend = async () => {
    setLoading(true);
    await dispatch(blockFriendAction(friendId));
    if (conversationId) await dispatch(clearConversationAction(conversationId));
    setLoading(false);
  };


  return <Modal open={open} onClose={onClose}>
    {!loading && (
        <>
        <h1 className="text-md text-white font-semibold mb-6">
            Are you sure you want to block this profile?
        </h1>
        <div className="flex items-center gap-4">
            <Button disabled={loading} onCLick={onClose} >
                Cancel
            </Button>
            <Button variant='danger' onClick={handleBlockFriend} disabled={loading} >
                Block Profile
            </Button>
        </div>
        </>
    )}
    {loading && <ClipLoader color="white"/>}
  </Modal>;
};

export default BlockFriendModal;
