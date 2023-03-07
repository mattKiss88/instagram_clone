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
import { useAppDispatch } from "../../Redux/hooks";
import { likeComment } from "../../Redux/modalSlice";
import { usePopperTooltip } from "react-popper-tooltip";
import ViewAccount from "../ToolTips/ViewAccount/indexCopy";

dayjs.extend(relativeTime);

// let relativeTime = require("dayjs/plugin/relativeTime");
// dayjs.extend(relativeTime);

interface props {
  comment: any;
  children?: any;
  type: string;
}

const Comment = ({ comment, children, type }: props) => {
  const { createdAt, totalLikes } = comment;
  const { fullName, avatar } = comment.user;
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      placement: "right",
      delayHide: 100,
      delayShow: 100,
      interactive: true,
    });

  const dispatch = useAppDispatch();

  const handleLike = async () => {
    setLiked(!liked);
    dispatch(likeComment({ commentId: comment.id, commentType: type }) as any);
  };

  if (comment.id === 11) console.log(comment, "ccc");

  useEffect(() => {
    setLiked(comment.liked || false);
  }, [comment.liked, comment.s]);

  const handleDisplayReplies = async () => {
    setShowReplies((prev) => !prev);
  };

  return (
    <CommentContainer type={type}>
      <div>
        <ProfilePic
          src={`${process.env.REACT_APP_S3_URL + avatar}`}
          ref={setTriggerRef}
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
          <AccountName>{fullName} </AccountName>
          <CommentText>{comment?.comment}</CommentText>
          <ActionsContainer>
            <TimeStamp>{dayjs(createdAt).fromNow()}</TimeStamp>
            <Likes>{totalLikes + " likes"}</Likes>
            <Reply>Reply</Reply>
          </ActionsContainer>
          {comment.subCommentCount ? (
            <>
              <ViewSubcomments onClick={handleDisplayReplies}>
                View replies ({comment.subCommentCount})
              </ViewSubcomments>
            </>
          ) : (
            ""
          )}
        </Container>
        <HeartIcon
          className={liked ? "heart activeHeart" : "heart"}
          onClick={handleLike}
        />
      </div>
      {showReplies && children}
    </CommentContainer>
  );
};

export default Comment;
