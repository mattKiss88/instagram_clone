import React from "react";
import FeedCard from "../../Components/FeedCard";
import { RightContainer, Section, LeftContainer } from "./styles";
import { seedData } from "./data";
import Suggested from "../Suggested";
const Feed = () => {
  return (
    <Section>
      <LeftContainer>
        {seedData.map((item: any) => (
          <FeedCard
            fullName={item.fullName}
            likes={item.likes}
            avatar={item.avatar}
            content={item.content}
            image={item.image}
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
