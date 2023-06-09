import styled from "styled-components";

export const CardHeader = styled.div`
  background: #ffffff;
  display: flex;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  justify-content: space-between;
  padding: 8px 12px;
  position: relative;
`;

export const ProfilePic = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
export const AccountName = styled.p`
  margin-left: 10px;
  font-weight: 700;
  cursor: pointer;
  padding: 7px 0;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;
