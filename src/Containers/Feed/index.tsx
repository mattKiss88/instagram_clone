import { useEffect, useState } from "react";
import FeedCard from "../../Components/FeedCard";
import { RightContainer, Section, LeftContainer } from "./styles";
import { seedData } from "./data";
import Suggested from "../Suggested";
import Stories from "../Stories";
import axios from "axios";
const Feed = () => {
  const [feed, setFeed] = useState<any>([]);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    let a = await axios.get(`${process.env.REACT_APP_API_URL}/post/feed/1`);
    setFeed(a.data.feed);
  };
  return (
    <Section>
      <LeftContainer>
        <Stories />
        {feed.map((item: any) => (
          <FeedCard
            fullName={item.user.username}
            likes={item.user.id}
            avatar={`https://instagramclonebucket.s3.us-east-2.amazonaws.com/${item.user.avatar}`}
            content={item.post.caption}
            image={`https://instagramclonebucket.s3.us-east-2.amazonaws.com/${item.images[0].mediaFileId}`}
          />
        ))}
      </LeftContainer>
      <RightContainer>
        <Suggested />
      </RightContainer>
    </Section>
  );
};

export default Feed;
