import { ViewGridIcon } from "@heroicons/react/outline";
import { CogIcon } from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Post from "../../Components/Post";
import {
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
import img from "../../Assets/6.jpg";
import img2 from "../../Assets/5.jpg";
import img3 from "../../Assets/1.jpg";

const Profile = () => {
  const [active, setActive] = useState("posts");

  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <UserCircleIcon className="profilePic" />
          <ProfileDetails>
            <TopRow>
              <Username>The Romanian</Username>
              <EditButton>Edit Profile</EditButton>
              <CogIcon style={{ width: "20px" }} />
            </TopRow>
            <MiddleRow>
              <Posts>
                <span>3</span> Posts
              </Posts>
              <Followers>
                <span>120</span> Followers
              </Followers>
              <Following>
                <span>2</span> Following
              </Following>
            </MiddleRow>

            <FullName>Matt kiss</FullName>
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
          <Post image={img} />
          <Post image={img2} />
          <Post image={img3} />
        </BottomContainer>
      </Section>
    </>
  );
};

export default Profile;
