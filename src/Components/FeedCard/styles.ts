import styled from "styled-components";

export const FeedWrapper = styled.div`
  max-width: 470px;
  height: auto;
  margin: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #dbdbdb;
`;

export const CardHeader = styled.div`
  background: #ffffff;
  display: flex;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  justify-content: space-between;
  padding: 8px 12px;
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
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;
