import { memo, useEffect, useMemo, useState } from "react";
import FeedCard, { FeedCardMemo } from "../../Components/FeedCard";
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
import { IPostData } from "../../Components/FeedCard/types";
import { shallowEqual } from "react-redux";
import Loader from "../../Components/loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Feed: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  let feed = useAppSelector(feedState, shallowEqual);
  let hasMore = useAppSelector((state) => state.feed.hasMore);
  const { width }: { width: number | undefined } = useWindowSize();
  const id: number = useAppSelector((state) => state.userAccount.id);
  const [loading, setLoading] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  console.log(feed, "feed");

  useEffect(() => {
    dispatch(fetchFeedByUserId(id) as any).then(() => setLoading(false));
    dispatch(fetchRecommendedUsers() as any);
  }, []);

  return (
    <Section>
      <LeftContainer>
        <Stories feed={feed} />
        <div>
          <InfiniteScroll
            dataLength={feed.length}
            next={() => dispatch(fetchFeedByUserId(id) as any)}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={<p>No more posts</p>}
            data-cy="feed-container"
          >
            {feed
              ?.filter((x: IPostData) => x.images.length)
              ?.map((item: IPostData) => (
                <FeedCardMemo
                  fullName={item.user.username}
                  likes={item.post.likeCount}
                  avatar={`${process.env.REACT_APP_S3_URL + item.user.avatar}`}
                  content={item.post.caption}
                  image={`${
                    (process.env.REACT_APP_S3_URL as string) +
                    item?.images?.[0]?.mediaFileId
                  }`}
                  postId={item.post?.id}
                  filter={item?.images?.[0]?.filter || ""}
                />
              ))}
          </InfiniteScroll>
        </div>
      </LeftContainer>
      {(width as number) > 1000 && (
        <RightContainer>
          <Suggested />
        </RightContainer>
      )}
    </Section>
  );
};

export const FeedMemo = memo(Feed, (prevProps, nextProps) => {
  return prevProps === nextProps;
});

export default Feed;
