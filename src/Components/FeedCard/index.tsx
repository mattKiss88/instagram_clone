import React, { useEffect, useState } from "react";
import { FeedWrapper, Image as Img, ImageContainer } from "./styles";
import PostHeader from "../Reusable/PostHeader";
import PostFooter from "../Reusable/PostFooter";
import { HeartIcon } from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { feed as feedState, updatePostLikes } from "../../Redux/feedSlice";
import { shallowEqual } from "react-redux";
import { likePost } from "../../Api";
import { Facebook } from "react-content-loader";

interface props {
  fullName: string;
  likes: number;
  avatar: string;
  content: string;
  image: string;
  postId: number;
  filter?: string;
}
const FeedCard: React.FC<props> = ({
  fullName,
  likes,
  avatar,
  content,
  image,
  postId,
  filter,
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [post, setPost] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  let feed = useAppSelector(feedState, shallowEqual);
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.userAccount);

  const onDoubleClick = () => {
    setLiked(true);
    if (post.post.likes) return null;
    dispatch(updatePostLikes(postId) as any);
    handleLike();
  };

  const handleLike = () => {
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
    setPost(feed.find((item: any) => item.post.id === postId));
  }, [feed]);

  const MyFacebookLoader = () => <Facebook />;

  const onLoad = () => {
    console.log("loaded");
    setLoading(false);
  };

  let loadImg = () => {
    let img = new Image();
    img.src = image;
    img.onload = onLoad;
  };

  if (loading) {
    loadImg();
    return <MyFacebookLoader />;
  }

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
        <Img src={image} className={`filter-${filter}`} />
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
