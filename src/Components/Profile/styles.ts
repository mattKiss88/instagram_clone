import styled from "styled-components";
export const Section = styled.section`
  max-width: 930px;
  margin: 0 auto;
`;

export const Container = styled.section`
  padding: 90px 0 40px;
  display: flex;
  border-bottom: 1px solid #dbdbdb;
`;

export const Avatar = styled.img`
  cursor: pointer;

  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: 0px 70px;
`;

export const ProfileDetails = styled.div`
  margin-left: 20px;
`;

export const Username = styled.h2`
  font-size: 28px;
`;

export const Posts = styled.p`
  margin-right: 30px;
`;
export const Followers = styled.p`
  margin-right: 30px;
  cursor: pointer;
`;
export const Following = styled.p`
  cursor: pointer;
`;
export const FullName = styled.p`
  font-weight: 700;
  font-size: 16px;
`;
export const EditButton = styled.button`
  background: none;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 5px 9px;
  margin-left: 20px;
  font-size: 14px;
  font-weight: 600;
  height: 30px;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 18px;

  svg {
    margin-left: 14px;
  }
`;

export const MiddleRow = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;

  span {
    font-weight: 700;
  }

  p {
    font-weight: 500;
    font-size: 16px;
  }
`;

const btnStyle = styled.div<IButtonProps>`
  margin-top: -1px;
  padding-top: 21px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-top: 1px solid transparent;
  opacity: 0.5;
  svg {
    width: 15px;
  }

  span {
    font-weight: 700;
    font-size: 12px;
    margin-left: 5px;
    letter-spacing: 0.1rem;
  }

  ${(props) =>
    props.active &&
    `border-top: 1px solid black;
  opacity: 1;`}
`;

interface IButtonProps {
  active: boolean;
}

export const PostBtn = styled(btnStyle)<IButtonProps>``;
export const SavedBtn = styled(btnStyle)<IButtonProps>`
  margin: 0 60px;
`;
export const TaggedBtn = styled(btnStyle)<IButtonProps>``;

export const BottomContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const PostsContainer = styled.div``;
