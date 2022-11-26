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

  useEffect(() => {
    if (isModalOpen && (isClickOutside || isEscapeEvent)) {
      setisClickOutside(false);
      dispatch(toggleModal());
      setIsEscapeEvent(false);
    }
  }, [isClickOutside, isModalOpen, isEscapeEvent]);

  return (
    <Container>
      <XIcon className="x" />
      <Modal ref={ref}>
        <ImageContainer>
          <Image src={img} />
        </ImageContainer>
        <SideBar>
          <PostHeader avatar={img} fullName="The romanian" />
          <CommentsWrapper>
            <CaptionContainer>
              <ProfilePic src={img} />
              <Caption>
                <span>The Romanian </span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
                quisquam facilis neque dolorem, rem tenetur dicta harum velit
                eveniet doloremque iure architecto aspernatur repudiandae
                consectetur! Aspernatur eius obcaecati facere iure.
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
