import React from "react";
import { Navbar, NextBtn, StepName, StepTwoNav } from "./styles";
import arrow from "../../../Assets/backArrow.svg";
import { useAppDispatch } from "../../../Redux/hooks";
import {
  createNewPost,
  resetImage,
  setStep,
  setLoading,
} from "../../../Redux/createPostModalSlice";
import { Notify } from "notiflix";
import useWindowSize from "../../../Hooks/useWindowSize";
import { ArrowLeftIcon } from "@heroicons/react/outline";
interface Props {
  step: number;
}

const NavBar: React.FC<Props> = ({ step }) => {
  const dispatch = useAppDispatch();
  const size = useWindowSize();
  const handleBackClick = (): void => {
    dispatch(setStep(step - 1));
    step === 2 && dispatch(resetImage());
  };

  const handleNextClick = (): void => {
    dispatch(setStep(step + 1));
  };

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    const createPost = await dispatch(createNewPost() as any);

    if (createPost.meta.requestStatus === "rejected") {
      dispatch(setLoading(false));
      return Notify.failure("Something went wrong, please try again later");
    }
  };

  const renderNav = () => {
    switch (step) {
      case 1:
        return (
          <>
            {(size.width as number) < 500 && (
              <ArrowLeftIcon
                style={{
                  width: "25px",
                  position: "absolute",
                  left: "20px",
                  top: "7px",
                }}
              />
            )}
            <StepName className="step1">Create new post</StepName>
          </>
        );
      case 2:
        return (
          <StepTwoNav>
            <img src={arrow} onClick={handleBackClick} />
            <StepName>Crop</StepName>
            <NextBtn onClick={handleNextClick}>Next</NextBtn>
          </StepTwoNav>
        );
      case 3:
        return (
          <StepTwoNav>
            <img src={arrow} onClick={handleBackClick} />
            <StepName>Edit</StepName>
            <NextBtn onClick={handleNextClick}>Next</NextBtn>
          </StepTwoNav>
        );
      case 4:
        return (
          <StepTwoNav>
            <img src={arrow} onClick={handleBackClick} />
            <StepName>Create new post</StepName>
            <NextBtn onClick={handleSubmit}>Share</NextBtn>
          </StepTwoNav>
        );
      default:
        return <img src={arrow} />;
    }
  };

  return <Navbar>{renderNav()}</Navbar>;
};

export default NavBar;
