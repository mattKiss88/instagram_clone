import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addModalData,
  isOpen,
  toggleModal,
} from "../../../Redux/postModalSlice";
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
import { followRecommendedUsers } from "../../../Redux/feedSlice";
import { setUnfollowModal } from "../../../Redux/unfollowModalSlice";
import { usePopperTooltip } from "react-popper-tooltip";

interface IViewAccountProps {
  user: IUser;
  // id?: string;
  // className?: string;
  // placement?: "top" | "bottom" | "left" | "right";
  // reff: React.Ref<HTMLDivElement>;
}

interface IStats {
  key: string;
  number: number;
}

const ViewAccount: React.FC<IViewAccountProps> = ({
  user,
  // id,
  // className,
  // placement,
}) => {
  const loggedInUserId = useAppSelector((state) => state.userAccount.id);
  const loggedInUserFriends = useAppSelector(
    (state) => state.userAccount.friends
  );
  const isModalOpen = useAppSelector(isOpen);

  // show

  // const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
  //   usePopperTooltip({
  //     placement: placement || "auto",
  //     delayHide: 100,
  //     delayShow: 100,
  //     interactive: true,

  //   });

  const stats: IStats[] = [
    { key: "posts", number: user.posts?.length || 0 },
    { key: "followers", number: user.followers },
    { key: "following", number: user.following },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = (postData: IPostData): void => {
    dispatch(addModalData(postData));
    navigate(`/profile/${postData.post.id}`);

    if (!isModalOpen) dispatch(toggleModal());
    if (user.id === loggedInUserId) return navigate(`/profile`);

    navigate(`/profile/${user.id}`);
  };

  const onProfileClick = (): void => {
    if (isModalOpen) dispatch(toggleModal());
    if (user.id === loggedInUserId) return navigate(`/profile`);

    navigate(`/profile/${user.id}`);
  };

  const onFollowClick = () => {
    dispatch(followRecommendedUsers(user.id) as any);
  };

  const onUnfollowClick = () => {
    dispatch(
      setUnfollowModal({
        isOpen: true,
        userId: user.id,
        username: user.username,
        avatar: user.avatar,
      })
    );
  };

  // if (!visible) return null;

  return (
    // <div ref={setTooltipRef} {...getTooltipProps({ className })} id={id}>
    <Container style={{ display: "block", position: "static" }}>
      <Header>
        <Left>
          <Avatar
            src={`${process.env.REACT_APP_S3_URL + user?.avatar}`}
            onClick={onProfileClick}
          />
        </Left>
        <Right>
          <Username onClick={onProfileClick}>{user.username}</Username>
          <Name>{user.fullName}</Name>
          <Bio>{user?.bio}</Bio>
        </Right>
      </Header>
      <StatsContainer>
        {stats.map((stat: IStats) => (
          <Stats>
            <Number>{stat.number}</Number>
            <Stat>{stat.key}</Stat>
          </Stats>
        ))}
      </StatsContainer>
      <Posts>
        {user.posts
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
        {loggedInUserFriends?.includes(user?.id) ? (
          <>
            <Button>Message</Button>
            <Button onClick={onUnfollowClick}>Following</Button>
          </>
        ) : (
          <Button onClick={onFollowClick} follow={true}>
            Follow
          </Button>
        )}
      </ButtonContainer>
    </Container>
    // </div>
  );
};

export default ViewAccount;
