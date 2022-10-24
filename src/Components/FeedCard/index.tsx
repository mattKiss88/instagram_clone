import React from "react";
import {
  AccountName,
  Caption,
  CardFooter,
  CardHeader,
  CommentWrapper,
  FeedWrapper,
  IconContainer,
  Image,
  ImageContainer,
  Input,
  Left,
  LeftContainer,
  Likes,
  PostButton,
  ProfilePic,
} from "./styles";
import {
  DotsHorizontalIcon,
  BookmarkIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ChatIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import pic from "../../Assets/shrooms.jpeg";
import post from "../../Assets/sunset.jpg";
interface props {
  fullName: string;
  likes: number;
  avatar: string;
  content: string;
  image: string;
}
const FeedCard = ({ fullName, likes, avatar, content, image }: props) => {
  return (
    <FeedWrapper>
      <CardHeader>
        <LeftContainer>
          <ProfilePic src={avatar} />
          <AccountName>{fullName}</AccountName>
        </LeftContainer>
        <DotsHorizontalIcon style={{ width: "24px", cursor: "pointer" }} />
      </CardHeader>
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
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
        <Caption>
          <span>{fullName}</span> {content}
        </Caption>
        <CommentWrapper>
          <div>
            <EmojiHappyIcon style={{ width: "24px", cursor: "pointer" }} />
            <Input type="text" placeholder="Add a comment..." />
          </div>
          <PostButton>Post</PostButton>
        </CommentWrapper>
      </CardFooter>
    </FeedWrapper>
  );
};

export default FeedCard;
