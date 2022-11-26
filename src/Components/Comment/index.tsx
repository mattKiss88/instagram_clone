import { HeartIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { AccountName, ProfilePic } from "../Reusable/misc";
import {
  ActionsContainer,
  CommentContainer,
  CommentText,
  Container,
  Likes,
  Reply,
  TimeStamp,
} from "./styles";

interface props {
  profilePic: string;
  fullName: string;
  comment: string;
  timeStamp: string;
  likes: number;
}

const Comment = ({
  profilePic,
  fullName,
  comment,
  timeStamp,
  likes,
}: props) => {
  const [liked, setLiked] = useState(false);
  return (
    <CommentContainer>
      <div>
        <ProfilePic src={profilePic} />
        <Container onDoubleClick={() => setLiked(!liked)}>
          <AccountName>{fullName} </AccountName>
          <CommentText>{comment}</CommentText>
          <ActionsContainer>
            <TimeStamp>{timeStamp}</TimeStamp>
            <Likes>{likes}</Likes>
            <Reply>Reply</Reply>
          </ActionsContainer>
        </Container>
      </div>
      <HeartIcon
        className={liked ? "heart activeHeart" : "heart"}
        onClick={() => setLiked(!liked)}
      />
    </CommentContainer>
  );
};

export default Comment;
