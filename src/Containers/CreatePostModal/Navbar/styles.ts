import styled from "styled-components";

export const Navbar = styled.nav`
  height: 39px;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  position: relative;
  .step1 {
    padding-top: 7px;
  }
`;

export const StepName = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 1.6rem;
`;

export const StepTwoNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 1.5rem 0;

  > img {
    transform: rotate(180deg);
    cursor: pointer;
  }
`;

export const NextBtn = styled.button`
  color: #1977f2;
  border: none;
  border-radius: 1rem;
  padding: 5px;
  background-color: none;
  font-weight: bold;
`;
