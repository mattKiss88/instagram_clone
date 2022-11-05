import React from "react";
import { FeedWrapper, Image, ImageContainer } from "./styles";

import PostHeader from "../Reusable/PostHeader";
import PostFooter from "../Reusable/PostFooter";
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
      <PostHeader avatar={avatar} fullName={fullName} />
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
      <PostFooter
        likes={likes}
        content={content}
        fullName={fullName}
        showCaption={true}
      />
    </FeedWrapper>
  );
};

export default FeedCard;
