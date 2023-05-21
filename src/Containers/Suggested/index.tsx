import {
  Button,
  Name,
  SuggestedContainer,
  SuggestedWrapper,
  Username,
  UsernameContainer,
  UserWrapper,
  SuggestedText,
  SeeAll,
  Avatar,
} from "./styles";
import { useAppSelector } from "../../Redux/hooks";
import { shallowEqual } from "react-redux";
import User from "./user";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../Components/Comment/types";

const Suggested: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userAccount, shallowEqual);
  const recommendedUsers = useAppSelector(
    (state) => state.feed.recommendedUsers,
    shallowEqual
  );

  const goToAccount = (): void => {
    navigate("/profile");
  };
  return (
    <SuggestedWrapper>
      <UserWrapper>
        <Avatar
          src={`${process.env.REACT_APP_S3_URL + user?.avatar}`}
          onClick={goToAccount}
        />
        <UsernameContainer onClick={goToAccount}>
          <Username>{user?.username}</Username>
          <Name>{user?.fullName}</Name>
        </UsernameContainer>
        <Button>Switch</Button>
      </UserWrapper>
      <SuggestedContainer>
        <SuggestedText>Suggested For You</SuggestedText>
        <SeeAll>See All</SeeAll>
      </SuggestedContainer>
      {recommendedUsers?.map((user: IUser, i: number) => (
        <User key={i} user={user} />
      ))}
    </SuggestedWrapper>
  );
};

export default Suggested;
