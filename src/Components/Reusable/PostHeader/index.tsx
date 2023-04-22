import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React from "react";
import { shallowEqual } from "react-redux";
import { feed } from "../../../Redux/feedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import ViewAccount from "../../ToolTips/ViewAccount";
import { CardHeader, LeftContainer, ProfilePic, AccountName } from "./styles";
import { useNavigate } from "react-router-dom";
import { toggleModal } from "../../../Redux/postModalSlice";
import { IPostData } from "../../FeedCard/types";
import {
  setPostSettingsModal,
  togglePostSettingsModal,
} from "../../../Redux/postSettingsSlice";

interface IPostHeader {
  avatar: string;
  fullName: string;
  postId: number;
  userId: number;
}
const PostHeader: React.FC<IPostHeader> = ({
  avatar,
  fullName,
  postId,
  userId,
}) => {
  const [hoveredOnName, setHoveredOnName] = React.useState<boolean>(false);
  const [hoveredOnToolTip, setHoveredOnToolTip] =
    React.useState<boolean>(false);
  const loggedInUserId = useAppSelector((state) => state.userAccount.id);
  const followingUsers = useAppSelector((state) => state.userAccount.friends);
  const isPostSettingsOpen = useAppSelector(
    (state) => state.postSettings.isOpen
  );

  const feedState = useAppSelector(feed, shallowEqual);
  const post: IPostData = feedState.find(
    (item: any) => item.post.id === postId
  );

  const modalIsOpen: boolean = useAppSelector(
    (state) => state.postModal.isOpen
  );

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

  const handleProfileClick = (): void => {
    if (modalIsOpen) {
      dispatch(toggleModal());
    }

    if (userId === loggedInUserId) return navigate(`/profile`);

    navigate(`/profile/${userId}`);
  };

  const handleDotsClick = (): void => {
    dispatch(
      setPostSettingsModal({
        isLoggedInUser: userId === loggedInUserId,
        isFollowing: followingUsers.includes(userId),
        isOpen: true,
        postId,
        userId,
      })
    );
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
      <DotsHorizontalIcon
        style={{ width: "24px", cursor: "pointer" }}
        onClick={handleDotsClick}
      />
    </CardHeader>
  );
};

export default PostHeader;
