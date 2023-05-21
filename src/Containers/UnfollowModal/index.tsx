import React, { useState } from "react";
import Modal from "react-modal";
import { Avatar, P } from "./styles";
import useWindowSize from "../../Hooks/useWindowSize";
import { followRecommendedUsers } from "../../Redux/feedSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  isUnfollowModalOpen,
  resetUnfollowModal,
  toggleUnfollowModal,
} from "../../Redux/unfollowModalSlice";
import { Btn } from "../PostSettingsModal/styles";
// import { Btn } from "./styles";

const UnfollowModal = () => {
  const isOpen: boolean = useAppSelector(isUnfollowModalOpen);

  const { avatar, userId, username } = useAppSelector(
    (state) => state.unfollowModal
  );
  const dispatch = useAppDispatch();
  const size = useWindowSize();

  Modal.setAppElement("#root");

  function closeModal(): void {
    // stop propogation to prevent modal from closing when clicking on modal content
    // e.stopPropagation();
    dispatch(toggleUnfollowModal());
    dispatch(resetUnfollowModal());
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      height: "auto",
      borderRadius: "15px",
      padding: "0",
    },

    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    className: "ReactModal--content",
  };

  const handleUnfollow = () => {
    dispatch(followRecommendedUsers(userId as number) as any);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Create post modal"
    >
      <Avatar
        src={process.env.REACT_APP_S3_URL + avatar}
        className="ReactModal-avatar"
      />
      <P className="ReactModal-p">Unfollow @{username}</P>
      <Btn
        style={{ color: "red", fontWeight: "600" }}
        onClick={handleUnfollow}
        className="ReactModal-btn"
      >
        Unfollow
      </Btn>
      <Btn onClick={closeModal} className="ReactModal-btn">
        Close
      </Btn>
    </Modal>
  );
};

export default UnfollowModal;
