import styled from "styled-components";

export const StepTwoCtn = styled.div`
  display: flex;
`;

export const ImageCtn = styled.div`
  border-radius: 10px;
`;

interface FilterProps {
  active: boolean;
}

export const FilterCtn = styled.div<FilterProps>`
  width: 0px;
  height: 0px;
  overflow: hidden;
  padding: 0rem;
  transition: all 0.5s ease-in-out;
  ${({ active }) =>
    active &&
    `width: 323px;
  height: 100%;`}
`;

export const FilterImg = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 10px;
`;

export const FilterImgCtn = styled.div`
  height: 90px;
  box-size: border-box;
`;

interface FilterProps {
  active: boolean;
}
export const Wrapper = styled.div<FilterProps>`
  margin-bottom: 1rem;
  cursor: pointer;
  box-size: border-box;
  > p {
    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;
    color: #8e8e8e;
    margin-top: 0.5rem;
    ${({ active }) =>
      active &&
      `color: #1977f2;
    `}
  }

  div {
    border: 1px solid transparent;
    ${({ active }) =>
      active &&
      `border: 1px solid blue;
    `}
    border-radius: 11px;
  }
`;

export const InnerCtn = styled.div`
  width: 323px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1.5rem;
`;
