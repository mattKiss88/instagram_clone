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
import Tabs from "./tabs";
import Loader from "../loader";

interface Props {
  ownAccount: boolean;
  userId?: number;
}

const Profile = ({ ownAccount }: Props) => {
  const [active, setActive] = useState("posts");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //   const posts = useAppSelector((state) => state.userPosts.posts);
  const isModalOpen = useAppSelector(isOpen);
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState({
    avatar: "",
    username: "",
    posts: [{}],
    followers: 0,
    following: 0,
    fullName: "",
  });

  console.log(user, "iddd");

  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${id}`)
      .then((res) => {
        console.log(res);
        setUser(res.data.user);
        setIsLoading(false);
        // dispatch(getPosts(res.data.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <Avatar src={`${process.env.REACT_APP_S3_URL + user.avatar}`} />
          <ProfileDetails>
            <TopRow>
              <Username>{user.username}</Username>
              <EditButton>Follow</EditButton>
            </TopRow>
            <MiddleRow>
              <Posts>
                <span>{user.posts?.length}</span> Posts
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
          {user.posts.map((post, x) => {
            return <Post post={{ ...post, user: { ...user } }} />;
          })}
        </BottomContainer>
      </Section>
    </>
  );
};

export default Profile;
