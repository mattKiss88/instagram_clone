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
import { customStyles } from "./styles";

const UnfollowModal = () => {
  const isOpen: boolean = useAppSelector(isUnfollowModalOpen);

  const { avatar, userId, username } = useAppSelector(
    (state) => state.unfollowModal
  );
  const dispatch = useAppDispatch();
  const size = useWindowSize();
  const s3Url = process.env.REACT_APP_S3_URL;

  Modal.setAppElement("#root");

  function closeModal(): void {
    dispatch(toggleUnfollowModal());
    dispatch(resetUnfollowModal());
  }

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
      <Avatar src={s3Url + avatar} className="ReactModal-avatar" />
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
