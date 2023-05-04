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
import { ReactElement, useEffect, useState } from "react";
import useWindowSize from "../../Hooks/useWindowSize";

const CreatePostModal: React.FC = () => {
  const isOpen: boolean = useAppSelector(isModalOpen);
  const step: number = useAppSelector(currentStep);
  const isLoading: boolean = useAppSelector(loading);
  const dispatch = useAppDispatch();
  const size = useWindowSize();
  const [width, setWidth] = useState<string>("523px");
  const [height, setHeight] = useState<string>("567px");

  Modal.setAppElement("#root");

  function closeModal(): void {
    dispatch(toggleModal());
    dispatch(resetState());
  }

  const renderStep = (): ReactElement => {
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
      width: width,
      minWidth: (size.width as number) > 500 ? "500px" : "auto",
      height: height,
      borderRadius: (size.width as number) < 500 ? "0px" : "15px",
      padding: "0",
      transition:
        (size.width as number) > 700 ? "all 0.5s ease-in-out" : "none",
    },

    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  useEffect(() => {
    if (step === 3 || step === 4) {
      setWidth("849px");
    }

    if ((size.width as number) < 860) {
      setWidth("70vw");

      if (step === 3) {
        setHeight("722px");
      }
    }

    if ((size.width as number) < 500) {
      setWidth("100vw");
      setHeight(String(size.height) + "px");
    }
  }, [step, size.width]);

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
