import React from "react";
import { StoriesContainer, StoriesWrapper } from "./styles";
import { seedData } from "../Feed/data";

const Stories = () => {
  return (
    <StoriesWrapper>
      {seedData.map((item: any) => (
        <StoriesContainer>
          <img src={item.avatar} alt="avatar" />
          <p>{item.fullName}</p>
        </StoriesContainer>
      ))}
    </StoriesWrapper>
  );
};

export default Stories;
