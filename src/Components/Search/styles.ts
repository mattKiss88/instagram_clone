import styled, { css, keyframes } from "styled-components";
interface IProps {
  showAnimation: boolean;
}
const appearFromLeft = keyframes`
from {
width: 0;
display: none;
opacity: 1;

}

to {
width: 350px;
display: block;
opacity: 1;
}
`;

export const SearchContainer = styled.div<IProps>`
  background: #fff;
  border-radius: 5px;
  width: 0;
  height: 100%;
  padding: 16px;
  left: 7.4rem;
  top: 0;
  position: absolute;
  z-index: 5;
  opacity: 0;
  animation-delay: 0.2s;
  animation: ${({ showAnimation }) =>
    showAnimation &&
    css`
      ${appearFromLeft} 0.5s ease-out forwards;
    `}
  animation-delay: 0.2s;
  border-right: 1px solid #e6e6e6;
`;

export const Header = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 3rem;
`;

export const SearchResultsCtn = styled.div`
  border-top: 1px solid #e6e6e6;
  > h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
`;

export const ScrollCtn = styled.div`
  height: calc(100vh - 28rem);
  overflow-y: scroll;
`;

export const UserItem = styled.div`
  display: flex;
  margin-bottom: 1.4rem;
  cursor: pointer;
  padding: 1rem;
  border-radius: 10px;

  &:hover {
    background: #f5f5f5;
  }
`;
export const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-right: 1rem;
`;
export const RightSide = styled.div`
  // margin-left: 1rem;

  h4 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.2rem;
    color: #999;
  }
`;
