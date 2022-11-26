import styled, { keyframes } from "styled-components";

const likeAnimation = keyframes`

50% {
    transform: scale(1.3);
    fill: red;
    stroke: red;
}

to {
    transform: scale(1);
    fill: red;
    stroke: red;
}
`;
export const CommentContainer = styled.div`
  margin-bottom: 16px;
  display: flex;

  > div {
    display: flex;

    > img {
      box-sizing: initial;
      margin-right: 15px;
    }
  }

  .heart {
    min-width: 12px;
    max-width: 12px;
    margin: 10px 0px auto 16px;
    transition: 0.4s;
    cursor: pointer;
  }

  .activeHeart {
    animation: ${likeAnimation} 0.4s ease-in-out forwards;
  }
`;

export const Container = styled.div`
  p {
    display: inline;
  }

  p:first-child {
    margin-left: 0;
  }
`;

export const CommentText = styled.p`
  font-weight: 400;
`;

export const TimeStamp = styled.p`
  font-weight: 300;
  margin-right: 12px;
  font-size: 12px;
  color: #8e8e8e;
`;

export const Likes = styled.p`
  font-weight: 600;
  margin-right: 12px;
  font-size: 12px;
  color: #8e8e8e;
`;

export const ActionsContainer = styled.div`
  margin-top: 5px;
`;

export const Reply = styled.p`
  font-weight: 600;
  font-size: 12px;
  color: #8e8e8e;
  cursor: pointer;
`;
