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
import { useAppDispatch } from "../../Redux/hooks";
import axios from "axios";
import { useParams } from "react-router-dom";
import Tabs from "./tabs";
import Loader from "../loader";
import { followRecommendedUsers } from "../../Redux/feedSlice";
import useWindowSize from "../../Hooks/useWindowSize";
interface IProfile {
  ownAccount: boolean;
  userId?: number;
}

const Profile: React.FC<IProfile> = ({ ownAccount }) => {
  const size = useWindowSize();
  const [active, setActive] = useState<string>("posts");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    avatar: "",
    username: "",
    posts: [{}],
    followers: 0,
    following: 0,
    fullName: "",
    id: 0,
    isFollowing: false,
  });

  const [buttonName, setButtonName] = useState<"Follow" | "Following">(
    "Follow"
  );

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${id}`)
      .then((res) => {
        setUser(res.data.user);
        setIsLoading(false);
        setButtonName(res.data.user.isFollowing ? "Following" : "Follow");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  const handleFollow = () => {
    if (buttonName === "Follow") {
      setButtonName("Following");
    } else {
      setButtonName("Follow");
    }

    dispatch(followRecommendedUsers(user.id) as any);
  };

  return (
    <>
      <Section>
        <Container>
          <Avatar src={`${process.env.REACT_APP_S3_URL + user.avatar}`} />
          <ProfileDetails>
            <TopRow>
              <Username>{user.username}</Username>
              <EditButton
                onClick={handleFollow}
                style={{
                  backgroundColor:
                    buttonName === "Follow" ? "#0095f6" : "initial",
                  color: buttonName === "Follow" ? "white" : "initial",
                }}
              >
                {buttonName}
              </EditButton>
            </TopRow>
            {(size.width as number) > 980 && (
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
            )}
            <FullName>{user.fullName}</FullName>
          </ProfileDetails>
        </Container>
        <Tabs ownAccount={ownAccount} active={active} setActive={setActive} />
        <BottomContainer>
          {user.posts.map((post, x) => {
            return (
              <Post post={{ ...post, user: { ...user } } as any} key={x} />
            );
          })}
        </BottomContainer>
      </Section>
    </>
  );
};

export default Profile;
