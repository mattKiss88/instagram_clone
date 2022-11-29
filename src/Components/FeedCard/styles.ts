import styled, { keyframes } from "styled-components";

export const FeedWrapper = styled.div`
  max-width: 470px;
  height: auto;
  margin: auto;
  border-radius: 10px;
  border: 1px solid #dbdbdb;
  margin-bottom: 12px;
`;

const likeAnimation = keyframes`

0%, 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100% {
  transform: translate(-50%, -50%);
  transform-origin: 0 0;

}

40% {
  transform: scale(1.3) translate(-50%, -50%);
  opacity: 1;
}

60% {
  transform: scale(1) translate(-50%, -50%);
  opacity: 1;
}


80% {
  transform: scale(1) translate(-50%, -50%);
  opacity: 1;
}


// 80% {
//   transform: scale(0.66) translate(-50%, -50%);
//   opacity: 0.66;
// }
90% {
  transform: scale(0.33) translate(-50%, -50%);
  opacity: 0.33;
}

100% {
  transform: scale(0) translate(-50%, -50%);
  opacity: 0;
}
`;

export const ImageContainer = styled.div`
  width: 100%;
  max-height: 587.5px;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    fill: #fff;
    stroke: white;
    opacity: 0;
  }

  .liked {
    animation: ${likeAnimation} 1s ease-in forwards;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 587.5px;
  object-fit: cover;
  pointer-events: none;

  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;
