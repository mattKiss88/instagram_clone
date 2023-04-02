import React from "react";
import { StoriesContainer, StoriesWrapper } from "./styles";
import { ISeedData, seedData } from "../Feed/data";

const Stories: React.FC = () => {
  return (
    <StoriesWrapper>
      {seedData.map((item: ISeedData) => (
        <StoriesContainer>
          <img src={item.avatar} alt="avatar" />
          <p>{item.fullName}</p>
        </StoriesContainer>
      ))}
    </StoriesWrapper>
  );
};

export default Stories;
