import React from "react";
import {
  BookmarkIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ChatIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import {
  Caption,
  CardFooter,
  CommentWrapper,
  IconContainer,
  Input,
  Left,
  Likes,
  PostButton,
} from "./styles";
interface props {
  likes: number;
  fullName: string;
  content: string;
  showCaption?: boolean;
}

const PostFooter = ({ likes, fullName, content, showCaption }: props) => {
  return (
    <CardFooter>
      <IconContainer>
        <Left>
          <HeartIcon />
          <ChatIcon />
          <PaperAirplaneIcon className="messages" />
        </Left>
        <BookmarkIcon />
      </IconContainer>
      <Likes>{likes} likes</Likes>
      {showCaption && (
        <Caption>
          <span>{fullName}</span> {content}
        </Caption>
      )}

      <CommentWrapper>
        <div>
          <EmojiHappyIcon style={{ width: "24px", cursor: "pointer" }} />
          <Input type="text" placeholder="Add a comment..." />
        </div>
        <PostButton>Post</PostButton>
      </CommentWrapper>
    </CardFooter>
  );
};

export default PostFooter;
