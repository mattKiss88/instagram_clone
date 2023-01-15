import {
  CaptionContainer,
  CommentsWrapper,
  Container,
  Image,
  ImageContainer,
  Modal,
  SideBar,
} from "./styles";
import img from "../../Assets/8.jpg";
import PostHeader from "../../Components/Reusable/PostHeader";
import PostFooter from "../../Components/Reusable/PostFooter";
import Comment from "../../Components/Comment";
import { commentArr } from "../../Components/Comment/data";
import { AccountName, ProfilePic } from "../../Components/Reusable/misc";
import { Caption } from "../../Components/Reusable/PostFooter/styles";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useIsClickOutside } from "../../Hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  fetchCommentsByPostId,
  isOpen,
  toggleModal,
} from "../../Redux/modalSlice";
import { useEscape } from "../../Hooks/useEscape";
import { updateLikes } from "../../Redux/feedSlice";
import axios from "axios";

interface props {}

const ViewPostModal = ({}: props) => {
  const dispatch = useAppDispatch();
  const { ref, isClickOutside, setisClickOutside } = useIsClickOutside(false);
  const { isEscapeEvent, setIsEscapeEvent } = useEscape();
  const { id } = useAppSelector((state) => state.userAccount);

  const isModalOpen = useAppSelector(isOpen);
  const modalData = useAppSelector((state) => state.modal);

  const { comments, user, post, images } = modalData;
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (isModalOpen && (isClickOutside || isEscapeEvent)) {
      setisClickOutside(false);
      dispatch(toggleModal());
      setIsEscapeEvent(false);
    }
  }, [isClickOutside, isModalOpen, isEscapeEvent]);

  const onDoubleClick = () => {
    setLiked(true);
    dispatch(updateLikes(post?.id));
    handleLike();

    setTimeout(() => {
      setLiked(false);
    }, 1000);
  };

  const handleLike = () => {
    setLiked(!liked);
    axios
      .post(`${process.env.REACT_APP_API_URL}/post/like`, {
        postId: post?.id,
        userId: id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(fetchCommentsByPostId(post?.id));
  }, []);

  return (
    <Container>
      <XIcon className="x" />
      <Modal ref={ref}>
        <ImageContainer onDoubleClick={onDoubleClick}>
          <Image
            src={`${process.env.REACT_APP_S3_URL + images[0].mediaFileId}`}
          />
        </ImageContainer>
        <SideBar>
          <PostHeader avatar={img} fullName={user.username} postId={post?.id} />
          <CommentsWrapper>
            <CaptionContainer>
              <ProfilePic src={img} />
              <Caption>
                <span className="username">{user.username} </span>{" "}
                {post?.caption}
              </Caption>
            </CaptionContainer>
            {comments?.map((c: any) => (
              <Comment
                profilePic={c.user?.avatar}
                fullName={c.user.fullName}
                comment={c.comment}
                timeStamp={c.createdAt}
                likes={c.id}
              />
            ))}
          </CommentsWrapper>
          <PostFooter
            likes={1000}
            content={"hey jude"}
            fullName={"The romanian"}
          />
        </SideBar>
      </Modal>
    </Container>
  );
};

export default ViewPostModal;
