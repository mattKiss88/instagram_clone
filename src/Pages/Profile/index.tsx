import { ViewGridIcon } from "@heroicons/react/outline";
import { CogIcon } from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Post from "../../Components/Post";
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
import img3 from "../../Assets/1.jpg";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { isOpen, addModalData } from "../../Redux/modalSlice";
import { getPosts } from "../../Redux/userPostsSlice";
import axios from "axios";
import { AccountName } from "../../Components/Reusable/misc";

const Profile = () => {
  const [active, setActive] = useState("posts");
  const posts = useAppSelector((state) => state.userPosts.posts);
  const isModalOpen = useAppSelector(isOpen);
  const user = useAppSelector((state) => state.userAccount);

  const dispatch = useAppDispatch();

  console.log(posts);

  useEffect(() => {
    axios
      .get("http://localhost:3001/post/4")
      .then((res) => {
        console.log(res);
        dispatch(getPosts(res.data.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <Avatar
            src={`http://localhost:3001/post/image/${user.avatar}` || ""}
          />
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
          <SavedBtn
            active={active === "saved"}
            onClick={() => setActive("saved")}
          >
            <BookmarkIcon />
            <span>SAVED</span>
          </SavedBtn>
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
            return (
              <Post
                image={`http://localhost:3001/post/image/${post.images[0].mediaFileId}`}
                i={x}
              />
            );
          })}
        </BottomContainer>
      </Section>
    </>
  );
};

export default Profile;
