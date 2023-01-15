import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React from "react";
import { shallowEqual } from "react-redux";
import { feed } from "../../../Redux/feedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import ViewAccount from "../../ToolTips/ViewAccount";
import { CardHeader, LeftContainer, ProfilePic, AccountName } from "./styles";

interface props {
  avatar: string;
  fullName: string;
  postId: number;
}
const PostHeader = ({ avatar, fullName, postId }: props) => {
  const [hoveredOnName, setHoveredOnName] = React.useState<boolean>(false);
  const [hoveredOnToolTip, setHoveredOnToolTip] =
    React.useState<boolean>(false);

  const feedState = useAppSelector(feed, shallowEqual);
  const post = feedState.find((item: any) => item.post.id === postId);

  const hovered = (name: string) => {
    if (name === "accountName") {
      setHoveredOnName(true);

      return;
    }

    if (name === "toolTip") {
      setHoveredOnToolTip(true);

      return;
    }
  };

  const unhovered = (name: string) => {
    if (name === "accountName") {
      setHoveredOnName(false);

      return;
    }

    if (name === "toolTip") {
      setHoveredOnToolTip(false);

      return;
    }
  };

  return (
    <CardHeader>
      <ViewAccount
        post={post}
        hovered={hovered}
        unhovered={unhovered}
        hoveredOnName={hoveredOnName}
        hoveredOnToolTip={hoveredOnToolTip}
      />
      <LeftContainer>
        <ProfilePic src={avatar} />
        <AccountName
          onMouseEnter={() => hovered("accountName")}
          onMouseLeave={() => unhovered("accountName")}
        >
          {fullName}
        </AccountName>
      </LeftContainer>
      <DotsHorizontalIcon style={{ width: "24px", cursor: "pointer" }} />
    </CardHeader>
  );
};

export default PostHeader;
