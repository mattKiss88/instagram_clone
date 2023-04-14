import React from "react";
import { useDispatch } from "react-redux";
import { addModalData, toggleModal } from "../../../Redux/postModalSlice";
import {
  Avatar,
  Bio,
  Button,
  ButtonContainer,
  Container,
  Header,
  Image,
  Left,
  Name,
  Number,
  Posts,
  PostWrapper,
  Right,
  Stat,
  Stats,
  StatsContainer,
  Username,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../Comment/types";
import { IImages, IPost, IPostData } from "../../FeedCard/types";
import { useAppSelector } from "../../../Redux/hooks";

interface IViewAccountProps {
  post: { user: IUser };
}

interface IStats {
  key: string;
  number: number;
}

const ViewAccount: React.FC<IViewAccountProps> = ({ post }) => {
  const loggedInUserId = useAppSelector((state) => state.userAccount.id);
  const loggedInUserFriends = useAppSelector(
    (state) => state.userAccount.friends
  );

  const stats: IStats[] = [
    { key: "posts", number: post?.user?.posts?.length || 0 },
    { key: "followers", number: post?.user?.followers },
    { key: "following", number: post?.user?.following },
  ];

  const { user } = post;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = (postData: IPostData): void => {
    dispatch(addModalData(postData));
    dispatch(toggleModal());
  };

  const onProfileClick = (): void => {
    if (user.id === loggedInUserId) return navigate(`/profile`);

    navigate(`/profile/${user.id}`);
  };

  return (
    <Container style={{ display: "block", position: "static" }}>
      <Header>
        <Left>
          <Avatar
            src={`${process.env.REACT_APP_S3_URL + user?.avatar}`}
            onClick={onProfileClick}
          />
        </Left>
        <Right>
          <Username onClick={onProfileClick}>{user?.username}</Username>
          <Name>{user?.fullName}</Name>
          <Bio>{user?.bio}</Bio>
        </Right>
      </Header>
      <StatsContainer>
        {stats.map((stat: IStats) => (
          <Stats>
            <Number>{stat?.number}</Number>
            <Stat>{stat?.key}</Stat>
          </Stats>
        ))}
      </StatsContainer>
      <Posts>
        {user?.posts
          ?.slice(0, 3)
          .map((post: { images: IImages[]; post: IPost }) => (
            <PostWrapper onClick={() => openModal({ ...post, user })}>
              <Image
                src={`${
                  (process.env.REACT_APP_S3_URL as string) +
                  post?.images?.[0]?.mediaFileId
                }`}
              />
            </PostWrapper>
          ))}
      </Posts>
      <ButtonContainer>
        {loggedInUserFriends.includes(post?.user?.id) ? (
          <>
            <Button>Message</Button>
            <Button>Following</Button>
          </>
        ) : (
          <Button>Follow</Button>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default ViewAccount;
