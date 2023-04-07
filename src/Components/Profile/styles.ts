import styled from "styled-components";
export const Section = styled.section`
  max-width: 970px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 480px) {
    padding: 0px;
  }
`;

export const Container = styled.section`
  padding: 90px 0 40px;
  display: flex;
  border-bottom: 1px solid #dbdbdb;

  @media (max-width: 600px) {
    padding: 30px 0 30px;
  }
`;

export const Avatar = styled.img`
  cursor: pointer;
  object-fit: cover;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: 0px 70px;

  @media (max-width: 600px) {
    width: 90px;
    height: 90px;
    margin: 0px 25px;
  }
`;

export const ProfileDetails = styled.div`
  margin-left: 20px;

  @media (max-width: 980px) {
    margin-left: 0px;
  }
`;

export const Username = styled.h2`
  font-size: 28px;

  @media (max-width: 600px) {
    margin-right: auto;
    font-size: 20px;
  }
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

  @media (max-width: 980px) {
    margin-left: 0px;
    margin-top: 10px;
  }

  @media (max-width: 600px) {
    width: 200px;
    background: #dbdbdb;
  }
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 18px;

  svg {
    margin-left: 14px;
  }

  @media (max-width: 980px) {
    flex-direction: column;
    align-items: center;

    svg {
      display: none;
    }
  }

  @media (max-width: 600px) {
    margin-top: 15px;
    width: fit-content;
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

  @media (max-width: 980px) {
    justify-content: center;
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 20px;
    margin: 20px 0px 0px;
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
  padding: 21px 30px 0px;
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
     opacity: 1;
  
  `}

  @media (max-width: 980px) {
    ${(props) =>
      props.active &&
      `  border-top: 1px solid transparent;
      opacity: 1;
    
    `}
  }
`;

interface IButtonProps {
  active: boolean;
}

export const PostBtn = styled(btnStyle)<IButtonProps>``;
export const SavedBtn = styled(btnStyle)<IButtonProps>``;
export const TaggedBtn = styled(btnStyle)<IButtonProps>``;

export const BottomContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;

  @media (max-width: 800px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  button {
  }
`;

export const PostsContainer = styled.div``;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  outline: none;
  // background: none;
  opacity: 0;
  cursor: pointer;
`;
export const AvatarContainer = styled.div`
  position: relative;
`;
