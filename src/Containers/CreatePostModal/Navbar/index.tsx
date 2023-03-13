import React from "react";
import { Navbar, NextBtn, StepName, StepTwoNav } from "./styles";
import arrow from "../../../Assets/backArrow.svg";
import { useAppDispatch } from "../../../Redux/hooks";
import { resetImage, setStep } from "../../../Redux/createPostModalSlice";

interface Props {
  step: number;
}

const NavBar: React.FC<Props> = ({ step }) => {
  console.log(step);
  const dispatch = useAppDispatch();

  const handleBackClick = () => {
    dispatch(setStep(step - 1));
    step === 2 && dispatch(resetImage());
  };

  const handleNextClick = () => {
    dispatch(setStep(step + 1));
  };

  const renderNav = () => {
    switch (step) {
      case 1:
        return <StepName className="step1">Create new post</StepName>;
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
            <NextBtn>Share</NextBtn>
          </StepTwoNav>
        );
      default:
        return <img src={arrow} />;
    }
  };
  return <Navbar>{renderNav()}</Navbar>;
};

export default NavBar;
