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
import defaultImg from "../../Assets/defaultPP.png";
import { shallowEqual } from "react-redux";
import User from "./user";
const Suggested = () => {
  const user = useAppSelector((state) => state.userAccount, shallowEqual);
  const recommendedUsers = useAppSelector(
    (state) => state.feed.recommendedUsers,
    shallowEqual
  );

  return (
    <SuggestedWrapper>
      <UserWrapper>
        <Avatar
          src={
            user?.avatar
              ? `http://localhost:3001/post/image/${user?.avatar}`
              : defaultImg
          }
        />
        <UsernameContainer>
          <Username>{user?.username}</Username>
          <Name>{user?.fullName}</Name>
        </UsernameContainer>
        <Button>Switch</Button>
      </UserWrapper>
      <SuggestedContainer>
        <SuggestedText>Suggested For You</SuggestedText>
        <SeeAll>See All</SeeAll>
      </SuggestedContainer>
      {recommendedUsers?.map((user: any, i: number) => (
        <User key={i} user={user} />
      ))}
    </SuggestedWrapper>
  );
};

export default Suggested;
