import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React from "react";
import { CardHeader, LeftContainer, ProfilePic, AccountName } from "./styles";

interface props {
  avatar: string;
  fullName: string;
}
const PostHeader = ({ avatar, fullName }: props) => {
  return (
    <CardHeader>
      <LeftContainer>
        <ProfilePic src={avatar} />
        <AccountName>{fullName}</AccountName>
      </LeftContainer>
      <DotsHorizontalIcon style={{ width: "24px", cursor: "pointer" }} />
    </CardHeader>
  );
};

export default PostHeader;
