import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React, { memo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { CardHeader, LeftContainer, ProfilePic, AccountName } from "./styles";
import { useNavigate } from "react-router-dom";
import { toggleModal } from "../../../Redux/postModalSlice";
import { IPostData } from "../../FeedCard/types";
import { setPostSettingsModal } from "../../../Redux/postSettingsSlice";
import { usePopperTooltip } from "react-popper-tooltip";
import ViewAccount from "../../ToolTips/ViewAccount/newTooltip";
import isEqual from "lodash/isEqual";

// function Tooltip({ children }: any) {
//   const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
//     usePopperTooltip({
//       placement: "bottom",
//       delayHide: 100,
//       delayShow: 100,
//       interactive: true,
//     });

//   const value = { getTooltipProps, setTooltipRef, setTriggerRef, visible };

//   return (
//     <TooltipContext.Provider value={value as any}>
//       {children}
//     </TooltipContext.Provider>
//   );
// }

// const TooltipContext = React.createContext<any>(null);

// function TooltipTrigger({ children }: any) {
//   const { setTriggerRef } = React.useContext(TooltipContext);
//   return React.cloneElement(children, { ref: setTriggerRef });
// }

// function TooltipContent({ children }: any) {
//   const { getTooltipProps, setTooltipRef, visible } =
//     React.useContext(TooltipContext);
//   return visible ? (
//     <div
//       ref={setTooltipRef}
//       {...getTooltipProps({ className: "user-tooltip-container" })}
//     >
//       {children}
//     </div>
//   ) : null;
// }

interface IPostHeader {
  avatar: string;
  fullName: string;
  postId: number;
  userId: number;
  postData: IPostData;
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
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <CardHeader>
      {/* <ViewAccount
            user={postData.user}
            className="user-tooltip-container"
            id="user-tooltip"
            placement="bottom"
            reff={ref}
          /> */}

      <LeftContainer onClick={handleProfileClick}>
        <ProfilePic src={avatar} data-cy="profile-pic" />
        <AccountName data-cy="username">{fullName}</AccountName>
      </LeftContainer>
      <DotsHorizontalIcon
        style={{ width: "24px", cursor: "pointer" }}
        onClick={handleDotsClick}
        data-cy="post-settings-button"
      />
    </CardHeader>
  );
};

function arePropsEqual(prevProps: any, nextProps: any) {
  return isEqual(prevProps, nextProps);
}

export default memo(PostHeader, arePropsEqual);
