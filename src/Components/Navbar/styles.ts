import styled from "styled-components";

export const Section = styled.section`
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
  position: fixed;
  background: #ffffff;
`;
export const Logo = styled.img`
  width: 103px;
  padding: 10px 12px;
  box-sizing: initial;
  margin-top: 7px;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  padding: 9px 11px;
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
    height: 25px;
    width: 25px;
  }
`;

export const Right = styled.div`
  display: flex;
`;
export const Center = styled.div`
  width: 100%;
  max-width: 268px;
  margin-left: 160px;
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  padding: 0 20px;
  margin: 0 auto;
  align-items: center;
  height: 100%;
`;

export const Search = styled.input`
  background: #efefef;
  border: none;
  font-size: 16px;
  padding: 8px;
  max-width: 240px;
  width: 100%;
  border-radius: 6px;
`;

export const SearchContainer = styled.div`
  background: #efefef;
  display: flex;
  border-radius: 6px;
  width: 100%;

  svg {
    margin-left: 10px;
  }
`;
