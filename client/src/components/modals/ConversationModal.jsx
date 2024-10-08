import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Pen, Trash2 } from "lucide-react";
import Modal from "components/common/Modal";
import Button from "components/common/Button";
import MessageForm from "components/forms/MessageForm";
import { deleteMesageAction } from "reduxStore/actions/conversationAction";

const ConversationModal = ({ message, open, onClose }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleDeleteMessage = async () => {
    setLoading(true);
    await dispatch(deleteMesageAction(message._id));
    setLoading(false);
    onClose();
  };
  return (
    <>
      <Modal
        open={openEditForm}
        onClose={() => {
          setOpenEditForm(false);
        }}
      >
        <div className="flex gap-2 justify-center items-center">
          {openEditForm && (
            <MessageForm
              message={message}
              onClose={() => {
                setOpenEditForm(false);
              }}
            />
          )}
        </div>
      </Modal>
      <Modal open={open} onClose={onClose}>
        <div className="flex justify-center items-center gap-2">
          <Button
            disabled={loading}
            onClick={() => {
              setOpenEditForm(true);
            }}
          >
            <Pen color="white" size={15} />
            Edit Message
          </Button>
          <Button
            variant="danger"
            disabled={loading}
            onClick={handleDeleteMessage}
          >
            <Trash2 color="white" size={15} />
            Delete Message
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConversationModal;
