import React from "react";
import { useDispatch } from "react-redux";
import CardContainer from "./CardCointainer";
import ProfileAvatar from "./ProfileAvatar";
import FriendCard from "./FriendCard";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "reduxStore/actions/friendsAction";

const FriendRequestCard = ({ friend }) => {
  const dispatch = useDispatch();
  const [relationship, setRelationship] = useState({
    friend: false,
    decided: false,
  });

  const handleRejectFriendRequest = async (e) => {
    e.preventDefault();
    setRelationship({
      friend: false,
      decided: true,
    });
    dispatch(rejectFriendRequest(friend._id));
  };

  const handleAcceptFriendReject = async () => {
    setRelationship({
      friend: true,
      decided: true,
    });
    dispatch(acceptFriendRequest(friend._id));
  };

  if (friendship.decided) {
    return <FriendCard friend={friend} friends={relationship.friends} />;
  }
  return (
    <CardContainer>
      <div className="flex items-center gap-2 overflow-hidden">
        <ProfileAvatar friend={friend} />
        <div className="flex gap-0.5 items-center min-w-0 max-w-full">
          <span className="text-md text-white">@</span>
          <span className="text-base text-white font-semibold tracking-wide overflow-hidden whitespace-nowrap text-ellipsis">
            {friend.username}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="px-3 py-1 bg-dark-gray border border-light-gray rounded-md"
          onClick={handleAcceptFriendReject}
        >
          <span className="text-white font-semibold cursor-pointer">
            Accept
          </span>
        </div>
        <div
          className="px-3 py-1 bg-main-green rounded-md"
          onClick={handleRejectFriendRequest}
        >
          <span className="text-white font-bold  cursor-pointer">Reject</span>
        </div>
      </div>
    </CardContainer>
  );
};

export default FriendRequestCard;
