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

interface IProps {
  user: any;
}
const User = ({ user }: IProps) => {
  const [buttonName, setButtonName] = useState<"Follow" | "Following">(
    "Follow"
  );

  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    if (buttonName === "Follow") {
      setButtonName("Following");
    } else {
      setButtonName("Follow");
    }

    dispatch(followRecommendedUsers(user.id) as any);
  };

  return (
    <SuggestedContainer>
      <ProfilePic
        src={`${
          user?.avatar
            ? process.env.REACT_APP_S3_URL + user?.avatar
            : defaultImg
        }`}
      />
      <UsernameContainer>
        <Username>{user.fullName}</Username>
        <Name>Popular</Name>
      </UsernameContainer>
      <Button onClick={onClickHandler}>{buttonName}</Button>
    </SuggestedContainer>
  );
};

export default User;
