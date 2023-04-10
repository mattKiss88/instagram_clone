import styled from "styled-components";
export const Nav = styled.nav`
  background: #fff;
  height: 50px;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10000;
  left: 0;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 300px;
    margin: 0 auto;
  }

  svg {
    width: 25px;
    height: 25px;
  }
`;

export const TopNav = styled.nav`
  background: #fff;
  height: 50px;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
  left: 0;

  svg {
    width: 25px;
    height: 25px;
  }
`;
