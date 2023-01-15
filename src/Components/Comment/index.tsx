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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// let relativeTime = require("dayjs/plugin/relativeTime");
// dayjs.extend(relativeTime);

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

  console.log("goo");
  return (
    <CommentContainer>
      <div>
        <ProfilePic src={`${process.env.REACT_APP_S3_URL + profilePic}`} />
        <Container onDoubleClick={() => setLiked(!liked)}>
          <AccountName>{fullName} </AccountName>
          <CommentText>{comment}</CommentText>
          <ActionsContainer>
            <TimeStamp>{dayjs(timeStamp).fromNow()}</TimeStamp>
            <Likes>{likes + " likes"}</Likes>
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
