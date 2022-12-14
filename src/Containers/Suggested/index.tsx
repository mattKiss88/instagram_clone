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
  Avatar,
} from "./styles";
import { seedData } from "../Feed/data";
import { ProfilePic } from "../../Components/Reusable/misc";
import { useAppSelector } from "../../Redux/hooks";

const Suggested = () => {
  const user = useAppSelector((state) => state.userAccount);

  console.log(user, "user");
  return (
    <SuggestedWrapper>
      <UserWrapper>
        <Avatar src={`http://localhost:3001/post/image/${user.avatar}`} />
        <UsernameContainer>
          <Username>{user?.username}</Username>
          <Name>{user?.fullName}</Name>
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
