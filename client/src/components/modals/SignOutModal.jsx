import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "components/common/Modal";
import Button from "components/common/Button";
import { signOutAction } from "reduxStore/actions/authActions";

const SignOutModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await dispatch(
      signOutAction().then(() => {
        navigate("/sign-in");
      })
    );
    setLoading(false);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <span className="text-white text-center font-semibold">
        Are you sure you want to sign out?
      </span>
      <div className="border-t-2 border-light-gray mt-3 pt-2 flex items-center gap-8">
        <Button onClick={onClose}>No</Button>
        <Button onClick={handleSignOut} disabled={loading}>
          Sign Out
        </Button>
      </div>
    </Modal>
  );
};

export default SignOutModal;
