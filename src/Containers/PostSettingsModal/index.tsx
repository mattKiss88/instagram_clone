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
import { customStyles } from "./styles";

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

  const handleFollow = () => {
    dispatch(followRecommendedUsers(userId as number) as any);
    closeModal();
  };
  const handleDelete = () => {
    dispatch(deletePost({ userId, postId } as any) as any);
    closeModal();

    if (isPostModalOpen) {
      dispatch(toggleModal());
    }
  };

  const handleOpenViewPostModal = () => {
    dispatch(addModalData(postData));
    dispatch(toggleModal());
    closeModal();
  };

  const renderButtons = (): any[] => {
    const ReactModalButton = ({ children, onClick, style }: any) => (
      <Btn style={style} onClick={onClick} className="ReactModal--btn">
        {children}
      </Btn>
    );

    return [
      !isLoggedInUser && (
        <ReactModalButton
          style={isFollowing ? { color: "red", fontWeight: "600" } : {}}
          onClick={handleFollow}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </ReactModalButton>
      ),
      isLoggedInUser && (
        <ReactModalButton
          style={{ color: "red", fontWeight: "600" }}
          onClick={handleDelete}
        >
          Delete
        </ReactModalButton>
      ),
      !isPostModalOpen && (
        <ReactModalButton onClick={handleOpenViewPostModal}>
          View Post
        </ReactModalButton>
      ),
    ].filter(Boolean);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Create post modal"
      id="post-settings-modal"
    >
      {renderButtons()}
      <Btn onClick={closeModal} className="ReactModal--btn">
        Close
      </Btn>
    </Modal>
  );
};

export default PostSettingsModal;
