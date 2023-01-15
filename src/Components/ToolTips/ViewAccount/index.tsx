import React from "react";
import { useDispatch } from "react-redux";
import { addModalData, toggleModal } from "../../../Redux/modalSlice";
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

interface Props {
  post: any;
  unhovered: (value: string) => void;
  hovered: (value: string) => void;
  hoveredOnToolTip: boolean;
  hoveredOnName: boolean;
}

const ViewAccount = ({
  post,
  unhovered,
  hovered,
  hoveredOnToolTip,
  hoveredOnName,
}: Props) => {
  const stats = [
    { key: "posts", number: post.user.posts.length },
    { key: "followers", number: post.user.followers },
    { key: "following", number: post.user.following },
  ];

  const { user } = post;
  const dispatch = useDispatch();

  const openModal = (postData: any) => {
    dispatch(addModalData(postData));
    dispatch(toggleModal());
  };
  return (
    <Container
      onMouseEnter={() => hovered("toolTip")}
      onMouseLeave={() => unhovered("toolTip")}
      show={hoveredOnName || hoveredOnToolTip}
    >
      <Header>
        <Left>
          <Avatar src={`${process.env.REACT_APP_S3_URL + user.avatar}`} />
        </Left>
        <Right>
          <Username>{user.username}</Username>
          <Name>{user.fullName}</Name>
          <Bio>{user.bio}</Bio>
        </Right>
      </Header>
      <StatsContainer>
        {stats.map((stat: any) => (
          <Stats>
            <Number>{stat?.number}</Number>
            <Stat>{stat.key}</Stat>
          </Stats>
        ))}
      </StatsContainer>
      <Posts>
        {post.user.posts.slice(0, 3).map((post: any) => (
          <PostWrapper onClick={() => openModal({ ...post, user })}>
            <Image
              src={`${
                process.env.REACT_APP_S3_URL + post.images[0].mediaFileId
              }`}
            />
          </PostWrapper>
        ))}
      </Posts>
      <ButtonContainer>
        <Button>Message</Button>
        <Button>Following</Button>
      </ButtonContainer>
    </Container>
  );
};

export default ViewAccount;
