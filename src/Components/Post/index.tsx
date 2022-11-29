import { ChatIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { addModalData, toggleModal } from "../../Redux/modalSlice";
import { CommentContainer, Img, Wrapper } from "./styles";
interface props {
  image: string;
  i: any;
}
const Post = ({ image, i }: props) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.userPosts.posts);
  const modalData = useAppSelector((state) => state.modal);
  const [post, setPost] = useState({
    images: posts[i].images,
    caption: posts[i].post.caption,
    username: "ammar",
  });

  console.log("zzz", modalData);

  console.log("post", post);

  const openModal = () => {
    dispatch(toggleModal());
    dispatch(addModalData(post));
  };

  return (
    <Wrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={openModal}
    >
      <Img src={image} />
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
