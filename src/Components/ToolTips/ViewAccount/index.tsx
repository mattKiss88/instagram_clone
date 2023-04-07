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
import { useAppSelector } from "../../../Redux/hooks";

interface IViewAccountProps {
  post: any;
  unhovered: (value: string) => void;
  hovered: (value: string) => void;
  hoveredOnToolTip: boolean;
  hoveredOnName: boolean;
}

const ViewAccount: React.FC<IViewAccountProps> = ({
  post,
  unhovered,
  hovered,
  hoveredOnToolTip,
  hoveredOnName,
}) => {
  const stats = [
    { key: "posts", number: post?.user?.posts?.length },
    { key: "followers", number: post?.user?.followers },
    { key: "following", number: post?.user?.following },
  ];

  const loggedInUserId = useAppSelector((state) => state.userAccount.id);

  const user = post?.user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = (postData: any) => {
    dispatch(addModalData(postData));
    dispatch(toggleModal());
  };

  const onProfileClick = () => {
    if (user.id === loggedInUserId) return navigate(`/profile`);
    navigate(`/profile/${user.id}`);
  };

  return (
    <Container
      onMouseEnter={() => hovered("toolTip")}
      onMouseLeave={() => unhovered("toolTip")}
      show={hoveredOnName || hoveredOnToolTip}
    >
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
        {stats.map((stat: any) => (
          <Stats>
            <Number>{stat?.number}</Number>
            <Stat>{stat.key}</Stat>
          </Stats>
        ))}
      </StatsContainer>
      <Posts>
        {post?.user?.posts.slice(0, 3).map((post: any) => (
          <PostWrapper onClick={() => openModal({ ...post, user })}>
            <Image
              src={`${
                process.env.REACT_APP_S3_URL + post?.images?.[0]?.mediaFileId
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
