import { CogIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Navbar from "../Navbar";
import Post from "../Post";
import {
  Avatar,
  BottomContainer,
  ButtonContainer,
  Container,
  EditButton,
  Followers,
  Following,
  FullName,
  MiddleRow,
  PostBtn,
  Posts,
  ProfileDetails,
  SavedBtn,
  Section,
  TaggedBtn,
  TopRow,
  Username,
} from "./styles";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useParams } from "react-router-dom";
import Tabs from "./tabs";

interface Props {
  ownAccount: boolean;
  userId?: number;
}

const Profile = ({ ownAccount, userId }: Props) => {
  const [active, setActive] = useState("posts");
  const posts = useAppSelector((state) => state.userPosts.posts);
  const user = useAppSelector((state) => state.userAccount);

  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <Avatar src={`${process.env.REACT_APP_S3_URL + user.avatar}`} />
          <ProfileDetails>
            <TopRow>
              <Username>{user.username}</Username>
              <EditButton>Edit Profile</EditButton>
              <CogIcon style={{ width: "20px" }} />
            </TopRow>
            <MiddleRow>
              <Posts>
                <span>{user.posts}</span> Posts
              </Posts>
              <Followers>
                <span>{user.followers}</span> Followers
              </Followers>
              <Following>
                <span>{user.following}</span> Following
              </Following>
            </MiddleRow>
            <FullName>{user.fullName}</FullName>
          </ProfileDetails>
        </Container>
        <Tabs ownAccount={ownAccount} active={active} setActive={setActive} />
        <BottomContainer>
          {posts.map((post, x) => {
            return <Post post={{ ...post, user: { ...user, posts } }} />;
          })}
        </BottomContainer>
      </Section>
    </>
  );
};

export default Profile;
