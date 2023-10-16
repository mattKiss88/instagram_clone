import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React from "react";
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
  const loggedInUserId = useAppSelector((state) => state.userAccount.id);
  const followingUsers = useAppSelector((state) => state.userAccount.friends);

  const feedState = useAppSelector(feed, shallowEqual);
  const post: IPostData = feedState.find(
    (item: any) => item.post.id === postId
  );

  const modalIsOpen: boolean = useAppSelector(
    (state) => state.postModal.isOpen
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleProfileClick = (): void => {
    if (modalIsOpen) {
      dispatch(toggleModal());
    }

    if (userId === loggedInUserId) return navigate(`/profile`);

    navigate(`/profile/${userId}`);
  };

  console.log(followingUsers, "followingUsers");

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
          id="user-tooltip"
        >
          <ViewAccount post={post} />
        </div>
      )}
      <LeftContainer onClick={handleProfileClick}>
        <ProfilePic src={avatar} data-cypress="profile-pic" />
        <AccountName ref={setTriggerRef} data-cypress="username">
          {fullName}
        </AccountName>
      </LeftContainer>
      <DotsHorizontalIcon
        style={{ width: "24px", cursor: "pointer" }}
        onClick={handleDotsClick}
        data-cypress="post-settings-button"
      />
    </CardHeader>
  );
};

export default PostHeader;
