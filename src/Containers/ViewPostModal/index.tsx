import {
  CaptionContainer,
  CommentsWrapper,
  Container,
  Image,
  ImageContainer,
  Modal,
  SideBar,
} from "./styles";
import PostHeader from "../../Components/Reusable/PostHeader";
import PostFooter from "../../Components/Reusable/PostFooter";
import Comment from "../../Components/Comment";
import { ProfilePic } from "../../Components/Reusable/misc";
import { Caption } from "../../Components/Reusable/PostFooter/styles";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState, useRef } from "react";
import { useIsClickOutside } from "../../Hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  fetchCommentsByPostId,
  isOpen,
  resetModal,
  toggleModal,
} from "../../Redux/postModalSlice";
import { useEscape } from "../../Hooks/useEscape";
import { updatePostLikes } from "../../Redux/feedSlice";
import { likePost } from "../../Api";
import { HeartIcon } from "@heroicons/react/outline";
import { Facebook } from "react-content-loader";
import Loader from "../../Components/loader";

export interface IReplyData {
  commentRepliedToId: number;
  reply: string;
  username: string;
}

const ViewPostModal = () => {
  // hooks
  const { ref, isClickOutside, setisClickOutside } = useIsClickOutside(false);
  const { isEscapeEvent, setIsEscapeEvent } = useEscape();

  // redux
  const { id } = useAppSelector((state) => state.userAccount);
  const isModalOpen = useAppSelector(isOpen);
  const modalData = useAppSelector((state) => state.postModal);
  const { comments, user, post, images } = modalData;

  // local state
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [reply, setReply] = useState<IReplyData | null>(null);
  const [imgHeight, setImgHeight] = useState<number | null | undefined>(null);

  const dispatch = useAppDispatch();
  const MyFacebookLoader = () => <Facebook />;

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isModalOpen && (isClickOutside || isEscapeEvent)) {
      setisClickOutside(false);
      dispatch(toggleModal());
      setIsEscapeEvent(false);
      dispatch(resetModal());
    }
  }, [isClickOutside, isModalOpen, isEscapeEvent]);

  const onDoubleClick = () => {
    setLiked(true);
    dispatch(updatePostLikes(post?.id) as any);

    handleLike();

    setTimeout(() => {
      setLiked(false);
    }, 1000);
  };

  const handleLike = async () => {
    setLiked(!liked);

    await likePost(post?.id, id);
  };

  useEffect(() => {
    Promise.resolve(dispatch(fetchCommentsByPostId(post?.id) as any)).then(() =>
      setLoading(false)
    );
  }, []);

  useEffect(() => {
    setImgHeight(imgRef.current?.clientHeight);
  }, [imgRef.current]);

  // if (!imgHeight) return <Loader />;

  return (
    <Container style={{ opacity: imgHeight ? "1" : "0" }}>
      <XIcon className="x" />
      <Modal ref={ref} height={imgHeight}>
        <ImageContainer onDoubleClick={onDoubleClick}>
          <HeartIcon className={liked && "liked"} />
          <Image
            src={`${process.env.REACT_APP_S3_URL + images[0].mediaFileId}`}
            className={`filter-${images[0].filter}`}
            ref={imgRef}
          />
        </ImageContainer>
        <SideBar>
          <PostHeader
            avatar={`${process.env.REACT_APP_S3_URL + user.avatar}`}
            fullName={user.username}
            postId={post?.id}
            userId={user.id}
          />
          <CommentsWrapper height={imgHeight}>
            <CaptionContainer>
              <ProfilePic
                src={`${process.env.REACT_APP_S3_URL + user.avatar}`}
              />
              <Caption>
                <span className="username">{user.username} </span>{" "}
                {post?.caption}
              </Caption>
            </CaptionContainer>
            {comments?.map((c: any) =>
              loading ? (
                MyFacebookLoader()
              ) : (
                <>
                  <Comment comment={c} type="new" setReply={setReply}>
                    {c?.subComments.map((sub: any) => (
                      <Comment comment={sub} type="sub" setReply={setReply} />
                    ))}
                  </Comment>
                </>
              )
            )}
          </CommentsWrapper>
          <PostFooter
            likes={post?.likeCount}
            fullName={user?.fullName}
            postData={{ user, post, images }}
            location="modal"
            replyData={reply}
            setReply={setReply}
          />
        </SideBar>
      </Modal>
    </Container>
  );
};

export default ViewPostModal;
