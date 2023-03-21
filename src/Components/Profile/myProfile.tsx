import { CogIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Post from "../Post";
import {
  Avatar,
  BottomContainer,
  Container,
  EditButton,
  Followers,
  Following,
  FullName,
  MiddleRow,
  Posts,
  ProfileDetails,
  Section,
  TopRow,
  Username,
} from "./styles";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import Tabs from "./tabs";
import { getUserPosts } from "../../Api";
import { getPosts } from "../../Redux/userPostsSlice";

interface Props {
  ownAccount: boolean;
  userId?: number;
}

const Profile = ({ ownAccount }: Props) => {
  const [active, setActive] = useState("posts");
  const posts = useAppSelector((state) => state.userPosts.posts);
  const user = useAppSelector((state) => state.userAccount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    handlePosts();
  }, []);

  const handlePosts = async () => {
    let res = await getUserPosts(user.id);
    dispatch(getPosts(res));
    console.log(res, "rest");
  };
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
