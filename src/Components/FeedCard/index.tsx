import React, { useEffect } from "react";
import { FeedWrapper, Image, ImageContainer } from "./styles";
import PostHeader from "../Reusable/PostHeader";
import PostFooter from "../Reusable/PostFooter";
import { HeartIcon } from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { feed as feedState, updateLikes } from "../../Redux/feedSlice";
import { shallowEqual } from "react-redux";
import axios from "axios";
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

  useEffect(() => {
    setPost(feed.find((item: any) => item.post.id === postId));
  }, [feed]);

  const onDoubleClick = () => {
    setLiked(true);
    dispatch(updateLikes(postId));
    handleLike();

    setTimeout(() => {
      setLiked(false);
    }, 1000);
  };

  const handleLike = () => {
    setLiked(!liked);

    axios
      .post(`${process.env.REACT_APP_API_URL}/post/like`, {
        postId: postId,
        userId: id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FeedWrapper>
      <PostHeader avatar={avatar} fullName={fullName} postId={postId} />
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
