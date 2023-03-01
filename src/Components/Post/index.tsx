import { ChatIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { addModalData, toggleModal } from "../../Redux/modalSlice";
import { CommentContainer, Img, Wrapper } from "./styles";
interface props {
  post: any;
}
const Post = ({ post }: props) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();
  // const posts = useAppSelector((state) => state.userPosts.posts);

  const openModal = () => {
    dispatch(addModalData(post));
    dispatch(toggleModal());
  };

  return (
    <Wrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={openModal}
    >
      <Img src={process.env.REACT_APP_S3_URL + post.images[0].mediaFileId} />
      {hovered && (
        <CommentContainer>
          <ChatIcon />
          <p>0</p>
        </CommentContainer>
      )}
    </Wrapper>
  );
};

export default Post;
