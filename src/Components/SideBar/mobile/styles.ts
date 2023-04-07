import styled from "styled-components";
export const Nav = styled.nav`
  background: #fff;
  height: 50px;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
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
