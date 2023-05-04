import React, { useState } from "react";
import Modal from "react-modal";
import useWindowSize from "../../Hooks/useWindowSize";
import { followRecommendedUsers } from "../../Redux/feedSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { addModalData, toggleModal } from "../../Redux/postModalSlice";
import {
  deletePost,
  isPostSettingsModalOpen,
  resetPostSettingsModal,
  togglePostSettingsModal,
} from "../../Redux/postSettingsSlice";
import { Btn } from "./styles";

const PostSettingsModal = () => {
  const isOpen: boolean = useAppSelector(isPostSettingsModalOpen);
  const isPostModalOpen: boolean = useAppSelector(
    (state) => state.postModal.isOpen
  );

  const { isLoggedInUser, isFollowing, userId, postId, postData } =
    useAppSelector((state) => state.postSettings);
  const dispatch = useAppDispatch();
  const size = useWindowSize();

  Modal.setAppElement("#root");

  function closeModal(): void {
    dispatch(togglePostSettingsModal());
    dispatch(resetPostSettingsModal());
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
  };

  const handleFollow = () => {
    dispatch(followRecommendedUsers(userId as number) as any);
    closeModal();
  };
  const handleDelete = () => {
    dispatch(deletePost({ userId, postId } as any) as any);
    closeModal();
  };

  const handleOpenViewPostModal = () => {
    dispatch(addModalData(postData));
    dispatch(toggleModal());
    closeModal();
  };

  const renderButtons = (): JSX.Element[] => {
    const btnArr: JSX.Element[] = [];
    if (isFollowing && !isLoggedInUser) {
      btnArr.push(
        <Btn style={{ color: "red", fontWeight: "600" }} onClick={handleFollow}>
          Unfollow
        </Btn>
      );
    }

    if (!isFollowing && !isLoggedInUser) {
      btnArr.push(<Btn onClick={handleFollow}>Follow</Btn>);
    }

    if (isLoggedInUser) {
      btnArr.push(
        <Btn style={{ color: "red", fontWeight: "600" }} onClick={handleDelete}>
          Delete
        </Btn>
      );
    }

    if (!isPostModalOpen) {
      btnArr.push(<Btn onClick={handleOpenViewPostModal}>View Post</Btn>);
    }

    return btnArr;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Create post modal"
    >
      {renderButtons()}
      <Btn onClick={closeModal}>Close</Btn>
    </Modal>
  );
};

export default PostSettingsModal;
