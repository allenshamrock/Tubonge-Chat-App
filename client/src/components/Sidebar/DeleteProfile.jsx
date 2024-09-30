import React, { useState } from "react";
import DeleteProfileModal from "components/modals/DeleteProfileModal";
import Button from "components/common/Button";
const DeleteProfile = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <DeleteProfileModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />
      <Button
        variant="danger"
        onclick={() => {
          setOpenModal(true);
        }}
      >
        Delete profile
      </Button>
    </>
  );
};

export default DeleteProfile;
