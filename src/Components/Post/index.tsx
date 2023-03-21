import { HeartIcon } from "@heroicons/react/outline";
import { ChatIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { addModalData, toggleModal } from "../../Redux/postModalSlice";
import { CommentContainer, DataCtn, Img, Wrapper } from "./styles";
interface props {
  post: any;
}
const Post = ({ post }: props) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();

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
      <Img
        src={process.env.REACT_APP_S3_URL + post?.images?.[0]?.mediaFileId}
      />
      {hovered && (
        <CommentContainer>
          <DataCtn>
            <HeartIcon />
            <p>{post.post.likeCount}</p>
          </DataCtn>
          <DataCtn>
            <ChatIcon />
            <p>{post.post.commentCount}</p>
          </DataCtn>
        </CommentContainer>
      )}
    </Wrapper>
  );
};

export default Post;
