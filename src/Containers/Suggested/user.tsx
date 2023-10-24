import React, { useState } from "react";
import { ProfilePic } from "../../Components/Reusable/misc";
import {
  Button,
  Name,
  SuggestedContainer,
  Username,
  UsernameContainer,
} from "./styles";
import defaultImg from "../../Assets/defaultPP.png";
import { useAppDispatch } from "../../Redux/hooks";
import { followRecommendedUsers } from "../../Redux/feedSlice";
import { usePopperTooltip } from "react-popper-tooltip";
import ViewAccount from "../../Components/ToolTips/ViewAccount/newTooltip";
import { IUser } from "../../Components/Comment/types";
import { useNavigate } from "react-router-dom";

interface IUserProps {
  user: IUser;
}
const User: React.FC<IUserProps> = ({ user }) => {
  const navigate = useNavigate();
  const [buttonName, setButtonName] = useState<"Follow" | "Following">(
    "Follow"
  );

  const dispatch = useAppDispatch();

  const onClickHandler = (): void => {
    if (buttonName === "Follow") {
      setButtonName("Following");
    } else {
      setButtonName("Follow");
    }
    dispatch(followRecommendedUsers(user.id) as any);
  };

  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      placement: "right",
      delayHide: 100,
      delayShow: 100,
      interactive: true,
    });

  const handleUsernameClick = (): void => {
    console.log("username clicked");
    navigate(`/profile/${user?.id}`);
  };

  return (
    <SuggestedContainer>
      <ProfilePic
        src={`${
          user?.avatar
            ? process.env.REACT_APP_S3_URL + user?.avatar
            : defaultImg
        }`}
        ref={setTriggerRef}
        onClick={handleUsernameClick}
      />
      <UsernameContainer>
        <Username onClick={handleUsernameClick}>{user.username}</Username>
        {visible && (
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: "tooltip-container" })}
          >
            {/* <ViewAccount user={user} /> */}
          </div>
        )}

        <Name onClick={handleUsernameClick}>{user.fullName}</Name>
      </UsernameContainer>
      <Button onClick={onClickHandler}>{buttonName}</Button>
    </SuggestedContainer>
  );
};

export default User;
