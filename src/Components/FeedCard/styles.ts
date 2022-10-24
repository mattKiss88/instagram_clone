import styled from "styled-components";

export const FeedWrapper = styled.div`
  max-width: 470px;
  height: auto;
  margin: auto;
  border-radius: 10px;
  border: 1px solid #dbdbdb;
  margin-bottom: 12px;
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

export const ImageContainer = styled.div`
  width: 100%;
  max-height: 587.5px;
`;
export const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 587.5px;
  object-fit: cover;
`;

export const CardFooter = styled.div`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #ffffff;
`;

export const IconContainer = styled.div`
  display: flex;
  margin: 4px 4px 0;
  justify-content: space-between;

  svg {
    width: 28px !important;
    height: 28px !important;
    padding: 8px;
    box-sizing: content-box;
  }
`;
export const Left = styled.div`
  display: flex;

  .messages {
    // transform: rotate(60deg);
    // margin-bottom: 8px;
  }
`;

export const Likes = styled.p`
  font-weight: 700;
  padding: 0 12px 0px;
  margin-bottom: 12px;
`;

export const Caption = styled.p`
  font-weight: 400;
  padding: 0 12px 0px;
  margin-bottom: 12px;

  span {
    font-weight: 700;
  }
`;

export const CommentWrapper = styled.div`
  border-top: 1px solid #dbdbdb;
  display: flex;
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
  }
`;

export const Input = styled.input`
  border: none;
  margin-left: 12px;
  font-size: 14px;

  ::placeholder {
    font-weight: 500;
    opacity: 0.8;
  }
`;

export const PostButton = styled.button`
  border: none;
  background: none;
  color: #0095f6;
  font-weight: 700;
  float: right;
`;
