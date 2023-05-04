import styled from "styled-components";

export const StoriesContainer = styled.div`
  box-sizing: initial;
  padding: 10px 5px;
  width: 64px;
  min-width: 64px;
  max-width: 64px;
  cursor: pointer;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }

  p {
    white-space: nowrap;
    width: 66px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
  }
`;

export const StoriesWrapper = styled.div`
  background: white;
  border: 1px solid #dbdbdb;
  border-radius: 6px;
  display: flex;
  max-width: 470px;
  overflow-x: scroll;
  margin-bottom: 20px;
  padding: 10px;

  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;
