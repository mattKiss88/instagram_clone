import React, { useEffect, useRef, useState } from "react";
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
  ReplyPopUp,
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
import { IReplyData } from "../../../Containers/ViewPostModal";
import EmojiSelector from "../EmojiSelector";
interface props {
  likes: any;
  fullName: string;
  content?: string;
  showCaption?: boolean;
  postData?: any;
  location?: string;
  replyData?: IReplyData | null;
  setReply?: (reply: IReplyData | null) => void;
}

const PostFooter = ({
  likes,
  fullName,
  content,
  showCaption,
  postData,
  location,
  replyData,
  setReply,
}: props) => {
  const dispatch = useAppDispatch();
  const [liked, setLiked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [commentRepliedToId, setCommentRepliedToId] = useState<number | null>(
    null
  );
  const [submittedComments, setSubmittedComments] = useState<string[]>([]);
  const [showEmojiSelector, setShowEmojiSelector] = useState<boolean>(false);
  const { username, id } = useAppSelector((state) => state.userAccount);
  const feed = useAppSelector((state) => state.feed.posts);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = async () => {
    if (comment.length === 0) return;
    let newComment = await postComment(
      postData?.post?.id,
      comment,
      commentRepliedToId
    );
    setSubmittedComments([...submittedComments, newComment]);
    setComment("");
    setReply && setReply(null);
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

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  const exitReplyHandler = () => {
    setCommentRepliedToId(null);
    setComment("");
    setReply && setReply(null);
  };

  useEffect(() => {
    if (replyData) {
      setComment(replyData.reply);
      setCommentRepliedToId(replyData.commentRepliedToId);
      inputRef.current?.focus();
    }
  }, [replyData]);

  const handleEmojiSelector = () => {
    setShowEmojiSelector((prev) => !prev);
  };

  console.log(document.getElementById("preview"));

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
        {replyData && (
          <ReplyPopUp>
            Replying to {replyData?.username}
            <span onClick={exitReplyHandler}>x</span>
          </ReplyPopUp>
        )}

        <div style={{ position: "relative" }}>
          <EmojiHappyIcon
            style={{ width: "24px", cursor: "pointer" }}
            onClick={handleEmojiSelector}
          />
          {showEmojiSelector && <EmojiSelector />}
          <Input
            rows={1}
            placeholder="Add a comment..."
            value={comment}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            ref={inputRef}
          />
        </div>
        <PostButton onClick={onSubmit}>Post</PostButton>
      </CommentWrapper>
    </CardFooter>
  );
};

export default PostFooter;
