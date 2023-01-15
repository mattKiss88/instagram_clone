import { useEffect } from "react";
import FeedCard from "../../Components/FeedCard";
import { RightContainer, Section, LeftContainer } from "./styles";
import Suggested from "../Suggested";
import Stories from "../Stories";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchFeedByUserId, feed as feedState } from "../../Redux/feedSlice";
import useWindowSize from "../../Hooks/useWindowSize";

const Feed = () => {
  const dispatch = useAppDispatch();
  let feed = useAppSelector(feedState);
  const { width }: any = useWindowSize();
  const { username, id } = useAppSelector((state) => state.userAccount);

  useEffect(() => {
    dispatch(fetchFeedByUserId(id));
  }, [id]);

  return (
    <Section>
      <LeftContainer>
        <Stories />
        {feed.map((item: any) => (
          <FeedCard
            fullName={item.user.username}
            likes={item.user.id}
            avatar={`${process.env.REACT_APP_S3_URL + item.user.avatar}`}
            content={item.post.caption}
            image={`${
              process.env.REACT_APP_S3_URL + item.images[0].mediaFileId
            }`}
            postId={item.post?.id}
          />
        ))}
      </LeftContainer>
      {width > 1000 && (
        <RightContainer>
          <Suggested />
        </RightContainer>
      )}
    </Section>
  );
};

export default Feed;
