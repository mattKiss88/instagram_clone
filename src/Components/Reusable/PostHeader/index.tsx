import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React from "react";
import { shallowEqual } from "react-redux";
import { feed } from "../../../Redux/feedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import ViewAccount from "../../ToolTips/ViewAccount";
import { CardHeader, LeftContainer, ProfilePic, AccountName } from "./styles";
import { useNavigate } from "react-router-dom";
import { toggleModal } from "../../../Redux/modalSlice";

interface props {
  avatar: string;
  fullName: string;
  postId: number;
  userId: number;
}
const PostHeader = ({ avatar, fullName, postId, userId }: props) => {
  const [hoveredOnName, setHoveredOnName] = React.useState<boolean>(false);
  const [hoveredOnToolTip, setHoveredOnToolTip] =
    React.useState<boolean>(false);

  const feedState = useAppSelector(feed, shallowEqual);
  const post = feedState.find((item: any) => item.post.id === postId);

  const modalIsOpen = useAppSelector((state) => state.modal.isOpen);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const handleProfileClick = () => {
    console.log("profile clicked");
    if (modalIsOpen) {
      dispatch(toggleModal());
    }
    navigate(`/profile/${userId}`);
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
      <LeftContainer onClick={handleProfileClick}>
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
