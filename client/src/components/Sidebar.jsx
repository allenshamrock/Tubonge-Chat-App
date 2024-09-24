import React, { useState } from "react";
import {
  MessageSquareText,
  User,
  UserPlus,
  Handshake,
  Logout,
} from "lucide-react";
const icons = {
  top: [
    {
      label: "Message",
      icon: "<MessageSquareText />",
      href: "/messages",
    },
    {
      label: "User",
      icon: "<User />",
      href: "/friends",
    },
    {
      label: "UserPlus",
      icon: "<UserPlus />",
      href: "/add-friend",
    },
    {
      label: "Handshake",
      icon: "<Handshake />",
      href: "/friend-requests",
    },
  ],
  bottom: [
    {
      label: "Logout",
      icon: "<LogOut />",
      href: "/sign-out",
    },
    {},
  ],
};
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleOpenUserSidebar = () => {};
  return (
    <div className="max-md:w-screen w-20 max-md:h-20 max-md:flex-col h-screen py-5 bg-dark-gray flex  items-center">
      <div className="max-md:flex max-md:justify-evenly max-md:items-center max-md:grow md:space-y-8">
        <div
          className="md:hidden w-9 h-9 rounded-full cursor-pointer"
          onClick={handleOpenUserSidebar}
        >
          <img src={user.avatar} alt="Avatar" loading="lazy" />
        </div>
      </div>
      <div className="max-md:hidden flex flex-col items-center gap-y-8">
        <div
          onClick={() => {
            setOpen(true);
          }}
        >
          {/* <SidebarIcon icon={icons.bottom} /> */}
        </div>
        <SignOutModal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
        <div
          className="w-10 h-10 overflow-hidden rounded-full cursor-pointer"
          onClick={handleOpenUserSidebar}
        >
          <img
            className="w-full h-full object-cover object-center"
            src={user.avatar}
            alt="Avatar"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
