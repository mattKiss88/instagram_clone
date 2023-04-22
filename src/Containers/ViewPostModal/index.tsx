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
import { IComment } from "../../Components/Comment/types";
import Loader from "../../Components/loader";
import useWindowSize from "../../Hooks/useWindowSize";
import { isPostSettingsModalOpen } from "../../Redux/postSettingsSlice";

export interface IReplyData {
  commentRepliedToId: number;
  reply: string;
  username: string;
}

const ViewPostModal: React.FC = () => {
  // hooks
  const { ref, isClickOutside, setisClickOutside } = useIsClickOutside(false);
  const { isEscapeEvent, setIsEscapeEvent } = useEscape();
  const { width } = useWindowSize();

  // redux
  const id: number = useAppSelector((state) => state.userAccount.id);
  const isModalOpen: boolean = useAppSelector(isOpen);
  const isSettingsOpen = useAppSelector(isPostSettingsModalOpen);
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
    if (isModalOpen && (isClickOutside || isEscapeEvent) && !isSettingsOpen) {
      setisClickOutside(false);
      dispatch(toggleModal());
      setIsEscapeEvent(false);
      dispatch(resetModal());
    }
  }, [isClickOutside, isModalOpen, isEscapeEvent, isSettingsOpen]);

  const onDoubleClick = (): void => {
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

  return (
    <>
      <Container>
        <>
          <XIcon className="x" />
          <Modal ref={ref} height={imgHeight}>
            {!imgHeight && (width as number) > 600 ? <Loader /> : null}
            {(width as number) > 600 && (
              <ImageContainer onDoubleClick={onDoubleClick}>
                <HeartIcon className={liked && "liked"} />
                <Image
                  src={`${
                    process.env.REACT_APP_S3_URL + images?.[0]?.mediaFileId
                  }`}
                  className={`filter-${images[0]?.filter}`}
                  ref={imgRef}
                  onLoad={() => setImgHeight(imgRef.current?.clientHeight)}
                />
              </ImageContainer>
            )}

            <SideBar height={imgHeight as number}>
              {(width as number) > 600 && (
                <PostHeader
                  avatar={`${process.env.REACT_APP_S3_URL + user.avatar}`}
                  fullName={user.username}
                  postId={post?.id}
                  userId={user.id}
                />
              )}
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
                {comments?.map((c: IComment) =>
                  loading ? (
                    MyFacebookLoader()
                  ) : (
                    <>
                      <Comment comment={c} type="new" setReply={setReply}>
                        {c?.subComments.map((sub: IComment) => (
                          <Comment
                            comment={sub}
                            type="sub"
                            setReply={setReply}
                          />
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
        </>
      </Container>
    </>
  );
};

export default ViewPostModal;
