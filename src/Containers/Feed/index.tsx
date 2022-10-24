import React from "react";
import FeedCard from "../../Components/FeedCard";
import { Section } from "./styles";
import { seedData } from "./data";
const Feed = () => {
  console.log(seedData);
  return (
    <Section>
      {seedData.map((item: any) => (
        <FeedCard
          fullName={item.fullName}
          likes={item.likes}
          avatar={item.avatar}
          content={item.content}
          image={item.image}
        />
      ))}
    </Section>
  );
};

export default Feed;
