import React from "react";
import { FeedWrapper, Image, ImageContainer } from "./styles";

import PostHeader from "../Reusable/PostHeader";
import PostFooter from "../Reusable/PostFooter";
import { HeartIcon } from "@heroicons/react/outline";
interface props {
  fullName: string;
  likes: number;
  avatar: string;
  content: string;
  image: string;
}
const FeedCard = ({ fullName, likes, avatar, content, image }: props) => {
  const [liked, setLiked] = React.useState<boolean>(false);

  const onDoubleClick = () => {
    setLiked(true);

    setTimeout(() => {
      setLiked(false);
    }, 1000);
  };
  return (
    <FeedWrapper>
      <PostHeader avatar={avatar} fullName={fullName} />
      <ImageContainer onDoubleClick={onDoubleClick}>
        <HeartIcon className={liked && "liked"} />
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
