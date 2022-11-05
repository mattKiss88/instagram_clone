import styled from "styled-components";

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
`;

export const ImageContainer = styled.div`
  max-width: 60%;
  background: black;
  height: 100%;
  width: fit-content;
`;

export const Image = styled.img`
  width: auto;
  height: 100%;
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

  p {
    margin: 0px 4px 16px;
  }
`;
