import React, { useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  addModalData,
  fetchCommentsByPostId,
  toggleModal,
  updateModalLikes,
} from "../../../Redux/modalSlice";
import ReadMore from "../ReadMore";
import { updateLikes, updatePostLikes } from "../../../Redux/feedSlice";
import { likePost, postComment } from "../../../Api";
interface props {
  likes: any;
  fullName: string;
  content?: string;
  showCaption?: boolean;
  postData?: any;
  location?: string;
}

const PostFooter = ({
  likes,
  fullName,
  content,
  showCaption,
  postData,
  location,
}: props) => {
  const dispatch = useAppDispatch();

  const [liked, setLiked] = React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>("");
  const [submittedComments, setSubmittedComments] = React.useState<string[]>(
    []
  );
  const { username, id } = useAppSelector((state) => state.userAccount);
  const feed = useAppSelector((state) => state.feed.posts);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = async () => {
    if (comment.length === 0) return;
    let newComment = await postComment(postData?.post?.id, comment);
    setSubmittedComments([...submittedComments, newComment]);
    setComment("");
    location === "modal" &&
      dispatch(fetchCommentsByPostId(postData?.post?.id) as any);
  };

  const openModal = () => {
    dispatch(addModalData(postData));
    dispatch(toggleModal());
  };

  useEffect(() => {
    setLiked(postData?.post?.likes || false);
  }, [feed, postData?.post?.likes]);

  const handleLike = async () => {
    setLiked(!liked);
    dispatch(updatePostLikes(postData?.post.id) as any);

    await likePost(postData?.post.id, id);
  };

  return (
    <CardFooter>
      <IconContainer>
        <Left>
          <HeartIcon
            className={liked ? "heart activeHeart" : "heart"}
            onClick={handleLike}
          />
          <ChatIcon onClick={openModal} />
          <PaperAirplaneIcon className="messages" />
        </Left>
        <BookmarkIcon />
      </IconContainer>
      <Likes>{likes} likes</Likes>
      {showCaption && (
        <Caption>
          <ReadMore>
            <span className="username">{fullName}</span>
            {content}
          </ReadMore>
        </Caption>
      )}
      {submittedComments.length > 0 &&
        location !== "modal" &&
        submittedComments.map((comment: string) => {
          return (
            <Caption>
              <ReadMore>
                <span className="username">{username}</span>
                {comment}
              </ReadMore>
            </Caption>
          );
        })}

      <CommentWrapper>
        <div>
          <EmojiHappyIcon style={{ width: "24px", cursor: "pointer" }} />
          <Input
            rows={1}
            placeholder="Add a comment..."
            value={comment}
            contentEditable="true"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
            onKeyDown={onKeyDown}
          />
        </div>
        <PostButton onClick={onSubmit}>Post</PostButton>
      </CommentWrapper>
    </CardFooter>
  );
};

export default PostFooter;
