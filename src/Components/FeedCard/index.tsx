import React from "react";
import {
  AccountName,
  CardHeader,
  FeedWrapper,
  LeftContainer,
  ProfilePic,
} from "./styles";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import pic from "../../Assets/shrooms.jpeg";
const FeedCard = () => {
  return (
    <FeedWrapper>
      <CardHeader>
        <LeftContainer>
          <ProfilePic src={pic} />
          <AccountName>ladbible</AccountName>
        </LeftContainer>
        <DotsHorizontalIcon style={{ width: "24px", cursor: "pointer" }} />
      </CardHeader>
    </FeedWrapper>
  );
};

export default FeedCard;
