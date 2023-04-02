import styled, { css } from "styled-components";

interface ISectionProps {
  collapse: boolean;
}

export const Section = styled.section<ISectionProps>`
  padding: 15px 12px;
  height: calc(100vh);
  width: 234px;
  border-right: 1px solid #e6e6e6;
  position: fixed;
  left: 0;
  z-index: 10;

  ${({ collapse }) =>
    collapse &&
    css`
      width: 70px;
      transition: 0.5s;
    `}
`;
export const Logo = styled.img`
  width: 123px;
  height: 69px;
  padding: 25px 12px 16px;
  margin-bottom: 10px;
  // margin-top: 30px;
`;

interface IProps {
  bold?: boolean;
}

export const IconContainer = styled.div<IProps>`
  padding: 9px;
  margin: 11px 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
  

  svg {
    height: 30px;
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    margin-right: 2rem;

  }

  :hover {
    background-color: #ededed;
    border-radius: 20px;
  }

  p {
    font-weight: 600;
    font-size: 1.6rem;
    ${({ bold }) => bold && "font-weight: 700;"}
`;

export const Top = styled.div`
  overflow: hidden;
`;
export const Bottom = styled.div``;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 120px);
`;
