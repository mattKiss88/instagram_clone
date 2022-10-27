import React from "react";
import { UserCircleIcon } from "@heroicons/react/outline";
import {
  Button,
  Name,
  SuggestedContainer,
  SuggestedWrapper,
  Username,
  UsernameContainer,
  UserWrapper,
  SuggestedText,
  SeeAll,
} from "./styles";
import { seedData } from "../Feed/data";
import { ProfilePic } from "../../Components/FeedCard/styles";

const Suggested = () => {
  return (
    <SuggestedWrapper>
      <UserWrapper>
        <UserCircleIcon
          style={{ width: "56px", height: "56px", cursor: "pointer" }}
        />
        <UsernameContainer>
          <Username>test124</Username>
          <Name>Matt Kiss</Name>
        </UsernameContainer>
        <Button>Switch</Button>
      </UserWrapper>
      <SuggestedContainer>
        <SuggestedText>Suggested For You</SuggestedText>
        <SeeAll>See All</SeeAll>
      </SuggestedContainer>
      {seedData.map((item: any) => (
        <SuggestedContainer>
          <ProfilePic src={item.avatar} />
          <UsernameContainer>
            <Username>{item.fullName}</Username>
            <Name>Popular</Name>
          </UsernameContainer>
          <Button>Follow</Button>
        </SuggestedContainer>
      ))}
    </SuggestedWrapper>
  );
};

export default Suggested;
