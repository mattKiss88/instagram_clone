import styled from "styled-components";

export const Wrapper = styled.section`
  width: calc(100% - 234px);
  margin-left: 234px;

  @media (max-width: 700px) {
    width: 100%;
    margin-left: 0;
  }
`;
