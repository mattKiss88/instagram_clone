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
    top: 50%;
  }
`;
