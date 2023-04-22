import styled from "styled-components";
interface props {
  show?: boolean;
}

export const Container = styled.div<props>`
  width: 380px;
  height: 340px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  //   padding: 15px;
  position: absolute;
  z-index: 1000000000;
  top: 35px;
  left: 50px;
  border: 1px solid #dbdbdb;

  display: ${(props) => (props.show ? "block" : "none")};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  padding: 15px;
`;

export const Left = styled.div`
  margin-right: 20px;
  height: fit-content;
`;
export const Right = styled.div`
  height: fit-content;
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  //   margin-right: 10px;
  cursor: pointer;
`;
export const Username = styled.p`
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;

export const Name = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #8e8e8e;
  margin-bottom: 12px;
  line-height: 1;
`;

export const Bio = styled.p`
  font-weight: 400;
  font-size: 14px;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
`;

export const Stats = styled.div`
  font-weight: 400;
  font-size: 14px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  width: 33%;
`;

export const Number = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
`;

export const Stat = styled.p`
  line-height: 1;
  color: #8e8e8e;
`;

export const Posts = styled.div`
  display: flex;
`;

export const PostWrapper = styled.div`
  width: 33%;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

export const Button = styled.button`
  background-color: transparent;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 5px 45px;
  font-weight: 600;
  font-size: 14px;
  color: #262626;
  margin: 0 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
