import styled from "styled-components";

export const SuggestedWrapper = styled.div`
  max-width: 320px;
`;
export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Button = styled.button`
  border: none;
  background: none;
  color: #0095f6;
  font-size: 12px;
  margin-left: auto;
  font-weight: 600;
  cursor: pointer;
`;

export const UsernameContainer = styled.div`
  margin-left: 10px;
`;

export const Username = styled.p`
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;
export const Name = styled.p`
  font-size: 14px;
  color: grey;
`;

export const SuggestedContainer = styled.div`
  display: flex;
  align-items: space-between;
  margin-top: 1rem;
  align-items: center;
  img {
    margin-right: 10px;
  }

  > div {
    p:last-child {
      font-size: 12px;
    }
  }
`;

export const SuggestedText = styled.p`
  color: grey;
  font-size: 14px;
  font-weight: 700;
`;

export const SeeAll = styled.button`
  border: none;
  background: none;
  color: black;
  font-size: 12px;
  margin-left: auto;
  font-weight: 600;
  cursor: pointer;
`;

export const Avatar = styled.img`
  cursor: pointer;
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;
