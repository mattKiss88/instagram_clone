import Modal from "react-modal";
import { useAppSelector } from "../../Redux/hooks";
import { isPostSettingsModalOpen } from "../../Redux/postSettingsSlice";
import { Button, Content, Title } from "./styles";
import { useState } from "react";

const WelcomeModal = () => {
  const hideModal = !!localStorage.getItem("welcomeModal");
  const [showModal, setShowModal] = useState(!hideModal);
  Modal.setAppElement("#root");

  function closeModal(): void {
    localStorage.setItem("welcomeModal", "true");
    setShowModal(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "min(90%, 500px)",
      height: "auto",
      borderRadius: "15px",
      padding: "25px",
    },

    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Welcome Modal"
    >
      <Title>Welcome to InstaClone!</Title>
      <Content>
        Welcome to InstaClone, a mirror of Instagram you know and love,
        recreated with a different purpose in mind.
        <br />
        <br />
        Please be aware that InstaClone is not affiliated with Instagram or
        Facebook, Inc. This independent project was developed purely for
        educational and demonstrative purposes.
        <br />
        <br />
        InstaClone mimics the features and user interface of Instagram to
        showcase the coding and design skills involved in creating such a
        platform. It's an exploration into the technical intricacies of building
        a social media app, complete with photo sharing, liking, commenting, and
        more.
        {/* <br />
        <br />
        Any content shared on InstaClone is not private and should be used
        strictly for demonstrative purposes. Please avoid sharing sensitive or
        personal information. Your understanding and cooperation is greatly
        appreciated! */}
        <br />
        <br />
        Enjoy your journey with InstaClone!
      </Content>
      <Button onClick={closeModal}>Got it!</Button>
    </Modal>
  );
};

export default WelcomeModal;
