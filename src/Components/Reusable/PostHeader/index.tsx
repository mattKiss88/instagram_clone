import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React from "react";
// import ViewAccount from "../../ToolTips/ViewAccount";
import { shallowEqual } from "react-redux";
import { feed } from "../../../Redux/feedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { CardHeader, LeftContainer, ProfilePic, AccountName } from "./styles";
import { useNavigate } from "react-router-dom";
import { toggleModal } from "../../../Redux/postModalSlice";
import { IPostData } from "../../FeedCard/types";
import { setPostSettingsModal } from "../../../Redux/postSettingsSlice";
import { usePopperTooltip } from "react-popper-tooltip";
import ViewAccount from "../../ToolTips/ViewAccount/newTooltip";

interface IPostHeader {
  avatar: string;
  fullName: string;
  postId: number;
  userId: number;
  postData?: IPostData;
}
const PostHeader: React.FC<IPostHeader> = ({
  avatar,
  fullName,
  postId,
  userId,
  postData,
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
        postData,
      })
    );
  };

  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      placement: "bottom",
      delayHide: 100,
      delayShow: 100,
      interactive: true,
    });

  return (
    <CardHeader>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "user-tooltip-container" })}
        >
          <ViewAccount post={post} />
        </div>
      )}
      <LeftContainer onClick={handleProfileClick}>
        <ProfilePic src={avatar} />
        <AccountName ref={setTriggerRef}>{fullName}</AccountName>
      </LeftContainer>
      <DotsHorizontalIcon
        style={{ width: "24px", cursor: "pointer" }}
        onClick={handleDotsClick}
      />
    </CardHeader>
  );
};

export default PostHeader;
