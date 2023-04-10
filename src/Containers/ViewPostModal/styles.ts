import styled, { css } from "styled-components";
import { likeAnimation } from "../../Components/FeedCard/styles";

interface IProps {
  height: any;
}

export const Modal = styled.div<IProps>`
  position: relative;
  height: 90vh;
  ${(props) => props.height && `height: ${props.height}px;`}
  max-width: 1100px;
  width: fit-content;
  background: #ffffff;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  border-radius: 0 10px 10px 0;
  max-width: 95vw;

  ${(props) =>
    !props.height &&
    css`
      @media (min-width: 600px) {
        ::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #fff;
          z-index: 10;
        }
      } ;
    `}

  @media (max-width: 600px) {
    height: 100vh;
    width: 100vw;
    max-width: 100vw;
  } ;
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
  width: 100%;
  height: auto;
  max-height: 90vh;
  pointer-events: none;

  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

interface sideBarProps {
  height: number;
}

export const SideBar = styled.div<sideBarProps>`
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

  ${({ height }) => `height: ${height}px;
  max-height: ${height}px;`}

  @media (max-width: 600px) {
    > div:first-child {
      > div p {
        margin-left: 0px;
      }
    }
  }
`;

export const CommentsWrapper = styled.div<IProps>`
  height: calc(90vh - 187px);
  ${(props) => props.height && `height: calc(${props.height}px - 187px);`}
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
  padding: 16px;

  @media (max-width: 600px) {
    padding: 115px 16px 40px !important;
    ${(props) => props.height && `height: calc(${props.height}px);`}
  }
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

export const NavbarMobile = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #fff;
  z-index: 100;
`;

export const TopMobile = styled.div`
  width: 100%;
  height: 50px;

  svg {
    width: 26px;
    position: absolute;
    top: 25px;
    left: 15px;
    transform: translateY(-50%);
  }
  p {
    text-align: center;
    padding-top: 15px;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const BottomMobile = styled.div`
  display: flex;
  background: #e8e8e8;
  padding: 7px 20px;
  align-items: center;
`;

export const InputMobile = styled.input`
  border: none;
  width: calc(100% - 30px);
`;

export const InputCtnMobile = styled.div`
  display: flex;
  border: 1px solid #dbdbdb;
  border-radius: 20px;
  padding: 5px 10px;
  width: 100%;
  height: 40px;
  align-items: center;
  background: #fff;
  margin-left: 20px;
`;

export const ReplyPopUpMobile = styled.div`
  color: #262626;
  font-weight: 400;
  bottom: -35px;
  position: absolute;
  width: 100%;
  left: 0;
  // text-align: center;
  display: block !important;
  padding: 8px 20px;
  font-size: 12px;
  background: #e8e8e8;
  border-top: 1px solid #dbdbdb;

  span {
    font-weight: 700;
    color: black;
    float: right;
    padding: 0 4px;
    cursor: pointer;
  }
`;
