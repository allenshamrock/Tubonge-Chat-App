import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "components/common/Button";
import { EllipsisVertical } from "lucide-react";
import { clearConversationAction } from "reduxStore/actions/conversationActions";
import BlockFriendModal from "../modals/BlockFriendModal";
import RemoveFriendModal from "../modals/RemoveFriendModal";
const Options = ({ conversation, friendId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOPen] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [unfollowModal, setUnfollowModal] = useState(false);

  const handleClearConversation = async () => {
    setLoading(true);
    await dispatch(clearConversationAction(conversation._id));
    setLoading(false);
    setOPen(false);
  };
  return (
    <div className="relative flex justify-center items-center z-50">
      <div
        className={`absolute top-16 right-0 space-y-2 shadow bg-light-gray rounded-lg transition-transform duration-100 transform ${
          open ? "visible translate-y-0" : "invisible -translate-y-5"
        }`}
      >
        <Button
          variant="danger"
          disabled={loading}
          onClick={handleClearConversation}
        >
          Clear conversation
        </Button>
        <Button
          variant="danger"
          disabled={loading}
          onClick={() => {
            setUnfollowModal(true);
          }}
        >
          Remove friend
        </Button>
        <Button
          variant="danger"
          disabled={loading}
          className="bg-red-600"
          onClick={() => {
            setOpenBlockModal(true);
          }}
        >
          Block friend
        </Button>
      </div>
      <BlockFriendModal
        friendId={friendId}
        conversationId={conversation._id}
        open={openBlockModal}
        onClose={() => {
          setOpenBlockModal(false);
        }}
      />
      <RemoveFriendModal
        friendId={friendId}
        conversationId={conversation._id}
        open={unfollowModal}
        onClose={() => {
          setUnfollowModal(false);
        }}
      />
      <div
        className={`cursor-pointer rounded-full p-2 transition-all duration-100 ${
          open ? "bg-white/10" : "bg-white/0"
        }`}
        onClick={()=>{
          setOPen(!open)
        }}
      >
        <EllipsisVertical color="white"/>
      </div>
    </div>
  );
};

export default Options;
