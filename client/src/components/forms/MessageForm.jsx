import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "components/common/Input";
import { Send } from "lucide-react";
import {
  sendMessageAction,
  editMessageAction,
} from "reduxStore/actions/conversationActions";
import MediaForm from "./MediaForm";
const MessageForm = ({ message, onClose }) => {
  const dispatch = useDispatch();
  const conversation = useSelector(
    (state) => state.conversation.selectedConversation
  );
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    body: message && message.body ? message.body : "",
    media: media && media.body ? media.body : null,
  });

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!conversation || loading) {
      return;
    }

    setLoading(true);
    const { body, media } = formData;
    const checkBody = body.replace(/[^a-zA-Z]/g, "").length;

    if (!checkBody && !media) {
      setLoading(false);
      return;
    }
    await dispatch(
      message
        ? editMessageAction(formData, message._id)
        : sendMessage(formData, message._id)
    );
    setLoading(false);
    setFormData({
      body: "",
      media: null,
    });

    if (onClose) {
      onClose();
    }

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        body: e.target.value,
      });
    };
  };
  return (
    <div className="h-16 bg-light-gray lg:px-12 lg:py-3">
      <form
        className="flex items-center gap-4 max-md:h-16 max-lg:bg-light-gray bg-dark-gray rounded-md overflow-hidden px-3 lg:px-6"
        onSubmit={sendMessage}
      >
        <Input
          placeholder="Your message"
          value={formData.body}
          onChange={handleInputChange}
          className="max-md:h-full max-lg:flex-1 max-lg:bg-light-gray"
        />
        <MediaForm value={formData.media} setFormData={setFormData} />
        <button type="submit" className="pl-3 border-l-2 border-light-gray">
          <Send color="#258c60" />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
