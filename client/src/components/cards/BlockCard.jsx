import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { unblockFriendAction } from "../../reduxStore/actions/friendsActions";
import CardContainer from "./CardContainer";
import FriendCard from "./FriendCard";

const BlockCard = ({ friend }) => {
  const dispatch = useDispatch();
  const [blocked, setBlocked] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleUnblock = async () => {
    setLoading(true);
    await dispatch(unblockFriendAction(friend._id));
    setLoading(false);
    setBlocked(false);
  };

  if (!blocked) {
    return <FriendCard key={friend._id} friend={friend} />;
  }
  return (
    <CardContainer>
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="w-12 h-12 overflow-hidden rounded-full flex-shrink-0">
          <img
            className="w-full h-full object-cover object-center "
            src={friend.avatar}
            alt="Avatar"
            loading="lazy"
          />
        </div>
        <div className="gap-0.5 flex items-center min-w-0 max-w-full">
          <span className="text-md text-white">@</span>
          <span className="text-base text-white font-semibold tracking-wide whitespace-nowrap overflow-hidden text-elipsis">
            {friend.username}
          </span>
        </div>
      </div>
      <div
        className="px-5 py-1 rounded-md  cursor-pointer flex gap-3 justidy-center items-center transition-color duration-100 bg-light-gray border border-light-gray"
        onClick={handleUnblock}
      >
        <span className="text-white text-sm font-semibold"> Unblock</span>
        {loading && <ClipLoader size={7} color="white"/>}
      </div>
    </CardContainer>
  );
};

export default BlockCard;
