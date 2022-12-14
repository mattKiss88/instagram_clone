import React, { useRef, useEffect } from "react";
import {
  BookmarkIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ChatIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import ShowMoreText from "react-show-more-text";

import {
  Caption,
  CardFooter,
  CommentWrapper,
  IconContainer,
  Input,
  Left,
  Likes,
  PostButton,
  Username,
} from "./styles";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { isOpen, toggleModal } from "../../../Redux/modalSlice";
import ReadMore from "../ReadMore";
import axios from "axios";
interface props {
  likes: number;
  fullName: string;
  content: string;
  showCaption?: boolean;
}

const PostFooter = ({ likes, fullName, content, showCaption }: props) => {
  const dispatch = useAppDispatch();

  const [liked, setLiked] = React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>("");
  const [submittedComments, setSubmittedComments] = React.useState<string[]>(
    []
  );
  const username = useAppSelector((state) => state.userAccount.username);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/comment/1`, { comment })
      .then((res) => {
        console.log(res.data);
        setSubmittedComments([...submittedComments, res.data.comment]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setComment("");
      });
  };

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/comment/1`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setTest(res.data[1].comment);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <CardFooter>
      <IconContainer>
        <Left>
          <HeartIcon
            className={liked ? "heart activeHeart" : "heart"}
            onClick={() => setLiked(!liked)}
          />
          <ChatIcon onClick={() => dispatch(toggleModal())} />
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
