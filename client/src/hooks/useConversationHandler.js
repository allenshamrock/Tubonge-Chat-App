import { useEffect } from "react";
import { useSelector } from "react-redux";
import { find } from "lodash";
import { io } from "socket.io-client";

// Connecting to your Flask-SocketIO backend
const socket = io("http://localhost:5000");

const useConversationHandlers = (setSortedConversations) => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const updateConversationSortHandler = (conversation) => {
      setSortedConversations((current) => {
        if (find(current, { _id: conversation._id })) {
          const updatedConversations = current.filter(
            (convo) => convo._id !== conversation._id
          );
          const currConversation = current.find(
            (convo) => convo._id === conversation._id
          );
          return [
            {
              ...currConversation,
              lastMessage: conversation.lastMessage,
            },
            ...updatedConversations,
          ];
        }
        return [conversation, ...current];
      });
    };

    // Joining the room for the current user
    socket.emit("join", { user_id: user._id });

    // Listening for conversation updates
    socket.on("conversation:update", updateConversationSortHandler);

    return () => {
      // Leaving room and clean up listeners
      socket.emit("leave", { user_id: user._id });
      socket.off("conversation:update", updateConversationSortHandler);
    };
  }, [user, setSortedConversations]);
};

export default useConversationHandlers;
