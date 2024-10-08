import React from "react";
import { useDispatch } from "react-redux";
import Options from "./Options";
import { OPEN_SIDEBAR } from "reduxStore/constants/profileConstants";

const Header = ({ conversation }) => {
  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    dispatch({
      type: OPEN_SIDEBAR,
      payload: conversation.friend,
    });
  };
  return (
    <div className="flex justify-between items-center py-3 px-5 bg-light-gray">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={handleOpenSidebar}
      >
        <div className="rounded-full w-10 h-10 overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={conversation.friend.avatar}
            alt="Avatar"
            loading="lazy"
          />
        </div>
        <span className="text-md text-white font-medium">
            {conversation.friend.name}
        </span>
      </div>
      <Options conversation={conversation} friendId={conversation.friend._id} />
    </div>
  );
};

export default Header;
