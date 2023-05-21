import {
  BottomMobile,
  CaptionContainer,
  CommentsWrapper,
  Container,
  Image,
  ImageContainer,
  InputCtnMobile,
  InputMobile,
  Modal,
  NavbarMobile,
  ReplyPopUpMobile,
  SideBar,
  TopMobile,
} from "./styles";
import PostHeader from "../../Components/Reusable/PostHeader";
import PostFooter from "../../Components/Reusable/PostFooter";
import Comment from "../../Components/Comment";
import { ProfilePic } from "../../Components/Reusable/misc";
import {
  Caption,
  PostButton,
  ReplyPopUp,
} from "../../Components/Reusable/PostFooter/styles";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  fetchCommentsByPostId,
  isOpen,
  resetModal,
  toggleModal,
} from "../../Redux/postModalSlice";
import { useEscape } from "../../Hooks/useEscape";
import { updatePostLikes } from "../../Redux/feedSlice";
import { likePost, postComment } from "../../Api";
import { HeartIcon } from "@heroicons/react/outline";
import { Facebook } from "react-content-loader";
import { IComment } from "../../Components/Comment/types";
import Loader from "../../Components/loader";
import useWindowSize from "../../Hooks/useWindowSize";
import { BackspaceIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Avatar } from "../Suggested/styles";
import { PostBtn } from "../../Components/Profile/styles";

export interface IReplyData {
  commentRepliedToId: number;
  reply: string;
  username: string;
}

const ViewPostModal: React.FC = () => {
  // hooks
  const { height } = useWindowSize();

  // redux
  const id: number = useAppSelector((state) => state.userAccount.id);
  const isModalOpen: boolean = useAppSelector(isOpen);
  const modalData = useAppSelector((state) => state.postModal);
  const signedInUserAvatar = useAppSelector(
    (state) => state?.userAccount?.avatar
  );
  const { comments, user, post } = modalData;

  // local state
  const [loading, setLoading] = useState<boolean>(true);
  const [reply, setReply] = useState<IReplyData | null>(null);
  const [comment, setComment] = useState<string>("");
  const [commentRepliedToId, setCommentRepliedToId] = useState<null | number>(
    null
  );

  const dispatch = useAppDispatch();
  const MyFacebookLoader = () => <Facebook />;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.resolve(dispatch(fetchCommentsByPostId(post?.id) as any)).then(() =>
      setLoading(false)
    );
  }, []);

  const closeModal = () => {
    dispatch(toggleModal());
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const exitReplyHandler = (): void => {
    setCommentRepliedToId(null);
    setComment("");
    setReply && setReply(null);
  };

  useEffect(() => {
    if (reply) {
      setComment(reply.reply);
      setCommentRepliedToId(reply.commentRepliedToId);
      inputRef.current?.focus();
    }
  }, [reply]);

  const onSubmit = async () => {
    if (comment.length === 0) return;
    let newComment = await postComment(post?.id, comment, commentRepliedToId);
    setComment("");
    setReply && setReply(null);
    dispatch(fetchCommentsByPostId(post?.id) as any);
  };

  return (
    <>
      <Container>
        <Modal height={height}>
          <NavbarMobile>
            <TopMobile>
              <ArrowLeftIcon onClick={closeModal} />
              <p>Comments</p>
            </TopMobile>
            <BottomMobile>
              <ProfilePic
                src={`${process.env.REACT_APP_S3_URL}${signedInUserAvatar}`}
              />
              <InputCtnMobile>
                <InputMobile
                  placeholder="Add a comment..."
                  ref={inputRef}
                  onChange={handleInputChange}
                  value={comment}
                />
                <PostButton onClick={onSubmit}>Post</PostButton>
              </InputCtnMobile>
            </BottomMobile>
            {reply && (
              <ReplyPopUpMobile>
                Replying to {reply?.username}
                <span onClick={exitReplyHandler}>x</span>
              </ReplyPopUpMobile>
            )}
          </NavbarMobile>
          <SideBar height={height as number}>
            <CommentsWrapper height={height}>
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
                        <Comment comment={sub} type="sub" setReply={setReply} />
                      ))}
                    </Comment>
                  </>
                )
              )}
            </CommentsWrapper>
          </SideBar>
        </Modal>
      </Container>
    </>
  );
};

export default ViewPostModal;
