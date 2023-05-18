import { HeartIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { AccountName, ProfilePic } from "../Reusable/misc";
import {
  ActionsContainer,
  CommentContainer,
  CommentText,
  Container,
  Likes,
  Reply,
  TimeStamp,
  ViewSubcomments,
} from "./styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { likeComment, toggleModal } from "../../Redux/postModalSlice";
import { usePopperTooltip } from "react-popper-tooltip";
import ViewAccount from "../ToolTips/ViewAccount/newTooltip";
import { IReplyData } from "../../Containers/ViewPostModal";
import { IComment } from "./types";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);

// let relativeTime = require("dayjs/plugin/relativeTime");
// dayjs.extend(relativeTime);

interface CommentProps {
  comment: IComment;
  children?: React.ReactNode;
  type: string;
  setReply: (reply: IReplyData | null) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  children,
  type,
  setReply,
}) => {
  const navigate = useNavigate();
  const loggedInUserId = useAppSelector((state) => state.userAccount.id);
  const { createdAt, likeCount } = comment;
  const { avatar, username } = comment.user;
  const [liked, setLiked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      placement: "right",
      delayHide: 100,
      delayShow: 100,
      interactive: true,
    });

  const handleLike = async (e: React.MouseEvent<HTMLDivElement>) => {
    setLiked(!liked);
    dispatch(likeComment({ commentId: comment.id, commentType: type }) as any);
  };

  useEffect(() => {
    setLiked(comment.liked || false);
  }, [comment.liked]);

  const handleDisplayReplies = async () => {
    setShowReplies(!showReplies);
  };

  const handleReplyEvent = (): void => {
    setReply({
      reply: `@${username} `,
      commentRepliedToId: comment.commentRepliedToId || comment.id,
      username: username,
    });
  };

  const handleClick = (): void => {
    dispatch(toggleModal());
    if (comment.user.id === loggedInUserId) return navigate(`/profile`);
    navigate(`/profile/${comment.user.id}`);
  };

  return (
    <CommentContainer type={type}>
      <div>
        <ProfilePic
          src={`${process.env.REACT_APP_S3_URL + avatar}`}
          ref={setTriggerRef}
          onClick={handleClick}
        />
        {visible && (
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: "tooltip-container" })}
          >
            <ViewAccount post={comment} />
          </div>
        )}
        <Container onDoubleClick={handleLike}>
          <AccountName onClick={handleClick}>{username} </AccountName>
          <CommentText>{comment?.comment}</CommentText>
          <ActionsContainer>
            <TimeStamp>{dayjs(createdAt).fromNow()}</TimeStamp>
            <Likes>{likeCount + " likes"}</Likes>
            <Reply onClick={handleReplyEvent}>Reply</Reply>
          </ActionsContainer>
        </Container>
        <HeartIcon
          className={liked ? "heart activeHeart" : "heart"}
          onClick={handleLike}
        />
      </div>
      {comment.subCommentCount ? (
        <>
          <ViewSubcomments onClick={handleDisplayReplies} id="show">
            View replies ({comment.subCommentCount})
          </ViewSubcomments>
        </>
      ) : (
        ""
      )}
      {showReplies && children}
    </CommentContainer>
  );
};

export default Comment;
