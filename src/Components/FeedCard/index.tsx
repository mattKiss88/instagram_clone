import React, { memo, useEffect, useState } from "react";
import { FeedWrapper, Image as Img, ImageContainer } from "./styles";
import PostHeader from "../Reusable/PostHeader";
import PostFooter from "../Reusable/PostFooter";
import { HeartIcon } from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { feed as feedState, updatePostLikes } from "../../Redux/feedSlice";
import { shallowEqual } from "react-redux";
import { likePost } from "../../Api";
import { Instagram } from "react-content-loader";

import { IPostData } from "./types";

interface IFeedCardProps {
  fullName: string;
  likes: number;
  avatar: string;
  content: string;
  image: string;
  postId: number;
  filter?: string;
  // onImageLoad: () => void;
}
const FeedCard: React.FC<IFeedCardProps> = ({
  fullName,
  likes,
  avatar,
  content,
  image,
  postId,
  filter,
  // onImageLoad,
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [post, setPost] = useState<IPostData>();
  const [loading, setLoading] = useState<boolean>(true);
  let feed = useAppSelector(feedState, shallowEqual);
  const dispatch = useAppDispatch();
  const id: number = useAppSelector((state) => state.userAccount.id);

  const onDoubleClick = (): void | null => {
    setLiked(true);
    if (post?.post.likes) return null;
    dispatch(updatePostLikes(postId) as any);
    handleLike();
  };

  const handleLike = (): void => {
    setLiked(!liked);
    Promise.resolve(likePost(postId, id));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (liked) setLiked(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [liked]);

  useEffect(() => {
    setPost(feed.find((item: IPostData) => item.post.id === postId));
  }, [feed]);

  // function handleImageLoad(): void {
  //   setLoading(false);
  // }

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Instagram />}
      <FeedWrapper style={{ display: loading ? "none" : "block" }}>
        <PostHeader
          avatar={avatar}
          fullName={fullName}
          postId={postId}
          userId={post?.user?.id || 0}
          postData={post}
        />
        <ImageContainer onDoubleClick={onDoubleClick}>
          <HeartIcon className={liked && "liked"} />
          <Img
            src={image}
            className={`filter-${filter}`}
            onLoad={handleImageLoad}
          />
        </ImageContainer>
        <PostFooter
          likes={likes}
          content={content}
          fullName={fullName}
          showCaption={true}
          postData={post}
        />
      </FeedWrapper>
    </>
  );
};

export const FeedCardMemo = memo(FeedCard, (prevProps, nextProps) => {
  return prevProps === nextProps;
});

export default FeedCard;
