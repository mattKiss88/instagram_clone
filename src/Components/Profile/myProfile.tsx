import { CogIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Post from "../Post";
import {
  Avatar,
  AvatarContainer,
  BottomContainer,
  Container,
  EditButton,
  Followers,
  Following,
  FullName,
  Input,
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
import { patchProfileImage } from "../../Redux/userAccountSlice";
import { IImages, IPost, IPostData } from "../FeedCard/types";
import { JsxElement } from "typescript";

interface IProfile {
  ownAccount: boolean;
  userId?: number;
}

const Profile: React.FC<IProfile> = ({ ownAccount }) => {
  const [active, setActive] = useState<string>("posts");
  const posts = useAppSelector((state) => state.userPosts.posts);
  const user = useAppSelector((state) => state.userAccount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    handlePosts();
  }, []);

  const handlePosts = async () => {
    let res = await getUserPosts(user.id);
    dispatch(getPosts(res));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File = e.target.files![0];
    dispatch(patchProfileImage(file) as any);
  };

  interface X {
    post: {
      caption: string;
      commentCount: number;
      createdAt: string;
      id: number;
      likeCount: number;
      updatedAt: string;
      userId: number;
    };
    images: {
      createdAt: string;
      filter: null | string;
      filterId: null | number;
      id: number;
      mediaFileId: string;
      position: number;
      postId: number;
      updatedAt: string;
    }[];
  }

  return (
    <>
      <Section>
        <Container>
          <AvatarContainer>
            <Avatar
              src={`${process.env.REACT_APP_S3_URL + user.avatar}`}
              id="avatar"
            />
            <Input type="file" onChange={handleUpload} />
          </AvatarContainer>
          <ProfileDetails>
            <TopRow>
              <Username>{user.username}</Username>
              <EditButton>Edit Profile</EditButton>
              <CogIcon style={{ width: "20px" }} />
            </TopRow>
            <MiddleRow>
              <Posts>
                <span>{posts.length}</span> Posts
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
          {posts.map((post: any, x: number) => {
            return (
              <Post key={x} post={{ ...post, user: { ...user, posts } }} />
            );
          })}
        </BottomContainer>
      </Section>
    </>
  );
};

export default Profile;
