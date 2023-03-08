import React, { createRef, useEffect, useRef } from "react";
import { FeedWrapper, Image, ImageContainer } from "./styles";
import PostHeader from "../Reusable/PostHeader";
import PostFooter from "../Reusable/PostFooter";
import { HeartIcon } from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  feed as feedState,
  updateLikes,
  updatePostLikes,
} from "../../Redux/feedSlice";
import { shallowEqual } from "react-redux";
import axios from "axios";
import { likePost } from "../../Api";
interface props {
  fullName: string;
  likes: number;
  avatar: string;
  content: string;
  image: string;
  postId: number;
}
const FeedCard = ({
  fullName,
  likes,
  avatar,
  content,
  image,
  postId,
}: props) => {
  const [liked, setLiked] = React.useState<boolean>(false);
  const [post, setPost] = React.useState<any>();
  let feed = useAppSelector(feedState, shallowEqual);
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.userAccount);
  const inputRef = createRef();
  useEffect(() => {
    setPost(feed.find((item: any) => item.post.id === postId));
  }, [feed]);

  const onDoubleClick = () => {
    setLiked(true);
    if (post.post.likes) return null;
    dispatch(updatePostLikes(postId) as any);
    handleLike();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (liked) setLiked(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [liked]);

  const handleLike = () => {
    setLiked(!liked);
    Promise.resolve(likePost(postId, id));
  };

  console.log(inputRef.current, "inputRef.current");

  return (
    <FeedWrapper>
      <PostHeader
        avatar={avatar}
        fullName={fullName}
        postId={postId}
        userId={post?.user?.id}
      />
      <ImageContainer onDoubleClick={onDoubleClick}>
        <HeartIcon className={liked && "liked"} />
        <Image src={image} />
      </ImageContainer>
      <PostFooter
        likes={likes}
        content={content}
        fullName={fullName}
        showCaption={true}
        postData={post}
      />
    </FeedWrapper>
  );
};

export default FeedCard;
