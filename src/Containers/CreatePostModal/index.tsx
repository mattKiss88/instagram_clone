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
import { createModalStyle } from "./styles";

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

  useEffect(() => {
    if ((size.width as number) < 500) {
      setWidth("100vw");
      setHeight(`${size.height}px`);
    } else if ((size.width as number) < 860) {
      setWidth("70vw");
      if (step === 3) {
        setHeight("722px");
      }
    } else if (step === 3 || step === 4) {
      setWidth("849px");
    }
  }, [step, size.width]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={createModalStyle(width, height, size.width as number)}
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
