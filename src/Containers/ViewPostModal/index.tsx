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
import { useEffect } from "react";
import { useIsClickOutside } from "../../Hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { isOpen, toggleModal } from "../../Redux/modalSlice";
import { useEscape } from "../../Hooks/useEscape";

interface props {}

const ViewPostModal = ({}: props) => {
  const dispatch = useAppDispatch();
  const { ref, isClickOutside, setisClickOutside } = useIsClickOutside(false);
  const { isEscapeEvent, setIsEscapeEvent } = useEscape();

  const isModalOpen = useAppSelector(isOpen);
  const modalData = useAppSelector((state) => state.modal);

  console.log(modalData);
  useEffect(() => {
    if (isModalOpen && (isClickOutside || isEscapeEvent)) {
      setisClickOutside(false);
      dispatch(toggleModal());
      setIsEscapeEvent(false);
    }
  }, [isClickOutside, isModalOpen, isEscapeEvent]);

  console.log("modalData", modalData);

  return (
    <Container>
      <XIcon className="x" />
      <Modal ref={ref}>
        <ImageContainer>
          <Image
            src={`http://localhost:3001/post/image/${modalData.images[0].mediaFileId}`}
          />
        </ImageContainer>
        <SideBar>
          <PostHeader avatar={img} fullName={modalData.username} />
          <CommentsWrapper>
            <CaptionContainer>
              <ProfilePic src={img} />
              <Caption>
                <span>{modalData.username} </span> {modalData.caption}
              </Caption>
            </CaptionContainer>
            {commentArr.map((c: any) => (
              <Comment
                profilePic={c.avatar}
                fullName={c.fullName}
                comment={c.comment}
                timeStamp={c.timeStamp}
                likes={c.likes}
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
