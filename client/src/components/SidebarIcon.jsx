import React, { useState, useEffect, cloneElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const SidebarIcon = ({ icon }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [hovered, setHovered] = useState(null);
  const [showLabel, setShowLabel] = useState(false);
  const [iconSize, setIconSize] = useState(false);

  const handleMouseEnter = (label) => {
    setShowLabel(label);
    setTimeout(() => {
      setShowLabel(true);
    }, 300);
  };

  const handleMouseLeave = (label) => {
    setHovered(null);
    setShowLabel(false);
  };

  const color = location.pathname === icon.href ? "#258c60" : "#c3c5ca";
    const className = `transition-all duration-150 ${
      iconSize ? "scale-75" : "scale-110"
    }`;
  return <div>SidebarIcon</div>;
};

export default SidebarIcon;
