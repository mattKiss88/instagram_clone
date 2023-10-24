import { HeartIcon } from "@heroicons/react/outline";
import { ChatIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { addModalData, toggleModal } from "../../Redux/postModalSlice";
import { IPostData } from "../FeedCard/types";
import { CommentContainer, DataCtn, Img, Wrapper } from "./styles";
import { getFullImageUrl, getImageFilterClass } from "../../Helpers/img";
interface IPost {
  post: IPostData;
}
const Post: React.FC<IPost> = ({ post }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // variables
  const imageUrl = getFullImageUrl(post.images[0].mediaFileId);
  const filterClass = getImageFilterClass(post.images[0].filter || "");

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
      <Img src={imageUrl} className={filterClass} />
      {hovered && (
        <CommentContainer>
          <DataCtn>
            <HeartIcon />
            <p>{post.post.likeCount}</p>
          </DataCtn>
          <DataCtn>
            <ChatIcon />
            <p>{post?.post?.commentCount}</p>
          </DataCtn>
        </CommentContainer>
      )}
    </Wrapper>
  );
};

export default Post;
