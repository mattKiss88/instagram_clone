import styled from "styled-components";
import { likeAnimation } from "../../Components/FeedCard/styles";

export const Modal = styled.div`
  position: relative;
  height: 90vh;
  max-width: 1100px;
  width: fit-content;
  background: #ffffff;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  border-radius: 0 10px 10px 0;
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;

  .x {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 26px;
    height: 26px;
    cursor: pointer;
    stroke: #ffffff;
  }
`;

export const ImageContainer = styled.div`
  max-width: 60%;
  background: black;
  height: 100%;
  width: fit-content;
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
  width: auto;
  height: 100%;
  pointer-events: none;

  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const SideBar = styled.div`
  max-width: 500px;
  background: white;
  height: 100%;
  width: 500px;
  border-radius: 0 0px 10px 0;

  > div:first-child {
    border-bottom: 1px solid #dbdbdb;
    padding: 15px;

    > div p {
      margin-left: 16px;
    }
  }
`;

export const CommentsWrapper = styled.div`
  height: calc(90vh - 187px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
  padding: 16px;
`;

export const CaptionContainer = styled.div`
  display: flex;
  margin-bottom: 16px;

  p {
    margin: 0px 4px 0px;
  }

  img {
    margin-right: 4px;
  }
`;
