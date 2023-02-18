import { ViewGridIcon } from "@heroicons/react/outline";
import { CogIcon } from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
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
import { isOpen, addModalData } from "../../Redux/modalSlice";
import { getPosts } from "../../Redux/userPostsSlice";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Props {
  ownAccount: boolean;
  userId?: number;
}

const Profile = ({ ownAccount, userId }: Props) => {
  const [active, setActive] = useState("posts");
  const posts = useAppSelector((state) => state.userPosts.posts);
  const isModalOpen = useAppSelector(isOpen);
  const user = useAppSelector((state) => state.userAccount);
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/post/${id || user.id}`)
      .then((res) => {
        console.log(res);
        dispatch(getPosts(res.data.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(user);

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
        <ButtonContainer>
          <PostBtn
            active={active === "posts"}
            onClick={() => setActive("posts")}
          >
            <ViewGridIcon />
            <span>POSTS</span>
          </PostBtn>
          {ownAccount && (
            <SavedBtn
              active={active === "saved"}
              onClick={() => setActive("saved")}
            >
              <BookmarkIcon />
              <span>SAVED</span>
            </SavedBtn>
          )}

          <TaggedBtn
            active={active === "tagged"}
            onClick={() => setActive("tagged")}
          >
            <UserCircleIcon />
            <span>TAGGED</span>
          </TaggedBtn>
        </ButtonContainer>
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
