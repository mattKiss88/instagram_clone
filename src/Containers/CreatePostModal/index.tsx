import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  currentStep,
  isModalOpen,
  loading,
  resetState,
  toggleModal,
} from "../../Redux/createPostModalSlice";
import NavBar from "./Navbar";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Loader from "../../Components/loader";

const CreatePostModal = () => {
  const isOpen = useAppSelector(isModalOpen);
  const step = useAppSelector(currentStep);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(loading);

  Modal.setAppElement("#root");

  function closeModal() {
    dispatch(toggleModal());
    dispatch(resetState());
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
      case 3:
      case 4:
        return <StepTwo />;
      default:
        return <StepOne />;
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: step === 3 || step === 4 ? "849px" : "523px",
      height: "567px",
      borderRadius: "15px",
      padding: "0",
      transition: "all 0.5s ease-in-out",
    },

    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Create post modal"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <NavBar step={step} />
          {renderStep()}
        </>
      )}
    </Modal>
  );
};

export default CreatePostModal;