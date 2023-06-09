import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.span`
  display: block;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: calc(50% - 70px);
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid grey;
    border-color: grey transparent grey transparent;
    animation: ${rotate} 1.2s linear infinite;
    top: 47%;
    z-index: 100;
  }
`;

export const ImgSpinner = styled.span`
  display: block;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 36%;
    left: 42%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid white;
    border-color: white transparent white transparent;
    animation: ${rotate} 1.2s linear infinite;
    z-index: 100;
  }
`;

export const ButtonSpinner = styled.span`
  display: block;
  height: 18px;
  width: 18px;
  position: relative;
  margin: 0 auto;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: calc(50% - 9px);
    left: calc(50% - 9px);
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid white;
    border-color: white transparent white transparent;
    animation: ${rotate} 1.2s linear infinite;
    z-index: 100;
  }
`;
