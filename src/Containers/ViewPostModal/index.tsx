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
import { AccountName, ProfilePic } from "../../Components/Reusable/misc";
import { Caption } from "../../Components/Reusable/PostFooter/styles";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useIsClickOutside } from "../../Hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  fetchCommentsByPostId,
  isOpen,
  resetModal,
  toggleModal,
} from "../../Redux/modalSlice";
import { useEscape } from "../../Hooks/useEscape";
import { updateLikes, updatePostLikes } from "../../Redux/feedSlice";
import { likePost } from "../../Api";
import { HeartIcon } from "@heroicons/react/outline";
import Loader from "../../Components/loader";
import { Facebook } from "react-content-loader";

interface props {}

const ViewPostModal = () => {
  const dispatch = useAppDispatch();
  const { ref, isClickOutside, setisClickOutside } = useIsClickOutside(false);
  const { isEscapeEvent, setIsEscapeEvent } = useEscape();
  const { id } = useAppSelector((state) => state.userAccount);

  const isModalOpen = useAppSelector(isOpen);
  const modalData = useAppSelector((state) => state.modal);

  const { comments, user, post, images } = modalData;
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isModalOpen && (isClickOutside || isEscapeEvent)) {
      setisClickOutside(false);
      dispatch(toggleModal());
      setIsEscapeEvent(false);
      dispatch(resetModal());
    }
  }, [isClickOutside, isModalOpen, isEscapeEvent]);

  const MyFacebookLoader = () => <Facebook />;

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

  return (
    <Container>
      <XIcon className="x" />
      <Modal ref={ref}>
        <ImageContainer onDoubleClick={onDoubleClick}>
          <HeartIcon className={liked && "liked"} />
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
            {comments?.map((c: any) =>
              loading ? (
                MyFacebookLoader()
              ) : (
                <>
                  <Comment comment={c} type="new">
                    {c?.subComments.map((sub: any) => (
                      <Comment comment={sub} type="sub" />
                    ))}
                  </Comment>
                </>
              )
            )}
          </CommentsWrapper>
          <PostFooter
            likes={post?.totalLikes}
            fullName={user?.fullName}
            postData={{ user, post, images }}
            location="modal"
          />
        </SideBar>
      </Modal>
    </Container>
  );
};

export default ViewPostModal;
