import { ChatIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { CommentContainer, Img, Wrapper } from "./styles";
interface props {
  image: string;
}
const Post = ({ image }: props) => {
  const [hovered, setHovered] = useState(false);

  console.log(hovered);
  return (
    <Wrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
