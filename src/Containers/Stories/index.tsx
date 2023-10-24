import React, { useEffect } from "react";
import { StoriesContainer, StoriesWrapper } from "./styles";
import { getFriends as retrieveFriends } from "../../Api";
import { IUser } from "../../Components/Comment/types";
import { useNavigate } from "react-router-dom";

interface StoriesProps {
  feed: any[];
}

const Stories: React.FC<StoriesProps> = ({ feed }) => {
  const [friends, setFriends] = React.useState<IUser[]>([]);
  const navigate = useNavigate();
  const s3Url = process.env.REACT_APP_S3_URL;

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
          <img src={s3Url + user.avatar} alt="avatar" />
          <p>{user.username}</p>
        </StoriesContainer>
      ))}
    </StoriesWrapper>
  );
};

export default Stories;
