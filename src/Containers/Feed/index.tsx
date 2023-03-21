import { useEffect } from "react";
import FeedCard from "../../Components/FeedCard";
import { RightContainer, Section, LeftContainer } from "./styles";
import Suggested from "../Suggested";
import Stories from "../Stories";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  fetchFeedByUserId,
  feed as feedState,
  fetchRecommendedUsers,
} from "../../Redux/feedSlice";
import useWindowSize from "../../Hooks/useWindowSize";

const Feed = () => {
  const dispatch = useAppDispatch();
  let feed = useAppSelector(feedState);
  const { width }: any = useWindowSize();
  const id = useAppSelector((state) => state.userAccount.id);
  const state = useAppSelector((state) => state);
  console.log(state, "state");
  useEffect(() => {
    dispatch(fetchFeedByUserId(id) as any);
    dispatch(fetchRecommendedUsers() as any);
  }, [id]);

  return (
    <Section>
      <LeftContainer>
        <Stories />
        {feed?.map((item: any) => (
          <FeedCard
            fullName={item.user.username}
            likes={item.post.likeCount}
            avatar={`${process.env.REACT_APP_S3_URL + item.user.avatar}`}
            content={item.post.caption}
            image={`${
              process.env.REACT_APP_S3_URL + item?.images?.[0]?.mediaFileId
            }`}
            postId={item.post?.id}
            filter={item?.images?.[0]?.filter}
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
