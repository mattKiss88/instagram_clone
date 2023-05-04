import React, { useEffect } from "react";
import { StoriesContainer, StoriesWrapper } from "./styles";
import { ISeedData, seedData } from "../Feed/data";
import { getFriends as retrieveFriends } from "../../Api";
import { IUser } from "../../Components/Comment/types";
import { useNavigate } from "react-router-dom";

interface StoriesProps {
  feed: any[];
}

const Stories: React.FC<StoriesProps> = ({ feed }) => {
  const [friends, setFriends] = React.useState<IUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = async () => {
    let friendsList = await retrieveFriends();
    setFriends(friendsList);
  };

  const handleClick = (userId: number) => {
    navigate("/profile/" + userId);
  };
  return (
    <StoriesWrapper>
      {friends?.map((user: IUser) => (
        <StoriesContainer onClick={() => handleClick(user.id)}>
          <img src={process.env.REACT_APP_S3_URL + user.avatar} alt="avatar" />
          <p>{user.username}</p>
        </StoriesContainer>
      ))}
    </StoriesWrapper>
  );
};

export default Stories;
