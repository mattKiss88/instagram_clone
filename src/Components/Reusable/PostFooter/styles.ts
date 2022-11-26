import styled, { keyframes } from "styled-components";

const likeAnimation = keyframes`

50% {
    transform: scale(1.25);
    fill: red;
    stroke: red;
}

to {
    transform: scale(1);
    fill: red;
    stroke: red;
}
`;
export const CardFooter = styled.div`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #ffffff;

  svg {
    cursor: pointer;
  }

  .heart {
    transition: 0.4s;
    cursor: pointer;
  }

  .activeHeart {
    animation: ${likeAnimation} 0.35s ease-in-out forwards;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  margin: 4px 4px 0;
  justify-content: space-between;

  svg {
    width: 28px !important;
    height: 28px !important;
    padding: 8px;
    box-sizing: content-box;
  }
`;
export const Left = styled.div`
  display: flex;

  .messages {
    // transform: rotate(60deg);
    // margin-bottom: 8px;
  }
`;

export const Likes = styled.p`
  font-weight: 700;
  padding: 0 12px 0px;
  margin-bottom: 12px;
`;

export const Caption = styled.p`
  font-weight: 400;
  padding: 0 12px 0px;
  margin-bottom: 12px;

  span {
    font-weight: 700;
  }
`;

export const CommentWrapper = styled.div`
  border-top: 1px solid #dbdbdb;
  display: flex;
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
  }
`;

export const Input = styled.input`
  border: none;
  margin-left: 12px;
  font-size: 14px;

  ::placeholder {
    font-weight: 500;
    opacity: 0.8;
  }
`;

export const PostButton = styled.button`
  border: none;
  background: none;
  color: #0095f6;
  font-weight: 700;
  float: right;
`;
