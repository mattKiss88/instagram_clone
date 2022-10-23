import styled from "styled-components";

export const Section = styled.section`
  padding: 15px 12px;
  height: calc(100vh);
  width: 234px;
  border-right: 1px solid #e6e6e6;
  position: fixed;
  background: #ffffff;
`;
export const Logo = styled.img`
  width: 123px;
  height: 69px;
  padding: 25px 12px 16px;
  margin-bottom: 10px;
`;

export const IconContainer = styled.div`
  padding: 9px;
  margin: 11px 0px;
  display: flex;
  align-items: center;
  svg {
    height: 30px;
    width: 30px;
  }

  :hover {
    background-color: #ededed;
    border-radius: 20px;
  }
`;

export const Top = styled.div``;
export const Bottom = styled.div``;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 120px);
`;
