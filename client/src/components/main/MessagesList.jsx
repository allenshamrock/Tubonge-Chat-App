import React, { useRef, useMemo, memo, useEffect } from "react";

import GroupMessages from "./GroupMessages";

const MemoizedGroupMessages = memo(GroupMessages);

const MessagesList = ({ conversation, groupMessages }) => {
  const conversationRef = useRef(null);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [groupMessages]);

  const memoizedConversationMessage = useMemo(() => {
    if (conversation && groupMessages.length > 0) {
      return groupMessages.map((group, index) => (
        <MemoizedGroupMessages
          key={index}
          group={group}
          isLastGroup={groupMessages.length - 1 === index}
          friend={conversation.friend}
        />
      ));
    }

    return null

  }, [groupMessages,conversation]);
  return (
    <div
      ref={conversationRef}
      className="flex-1 flex flex-col-reverse overflow-y-auto bg-dark-grey "
    >
      <div className="max-lg:px-1 px-12 py-5">
        {memoizedConversationMessage}
      </div>
    </div>
  );
};

export default MessagesList;
