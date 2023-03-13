import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  currentStep,
  isModalOpen,
  toggleModal,
} from "../../Redux/createPostModalSlice";
import NavBar from "./Navbar";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { customStyles } from "./styles";

const CreatePostModal = () => {
  const isOpen = useAppSelector(isModalOpen);
  const step = useAppSelector(currentStep);
  const dispatch = useAppDispatch();

  Modal.setAppElement("#root");

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    dispatch(toggleModal());
  }

  console.log(step, "step");

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
      case 3:
        return <StepTwo />;
      // case 3:
      //   return <StepThree />;
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
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Create post modal"
    >
      <NavBar step={step} />
      {renderStep()}
    </Modal>
  );
};

export default CreatePostModal;
