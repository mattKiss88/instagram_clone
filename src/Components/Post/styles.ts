import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 293px;
  height: 293px;
  position: relative;
  aspect-ratio: 1/1;
  cursor: pointer;

  :hover {
    ::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.15);
    }
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const CommentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;

  svg {
    fill: White;
    stroke: White;
    width: 20px;
  }

  p {
    margin-left: 10px;
    color: white;
    font-weight: 600;
  }
`;
