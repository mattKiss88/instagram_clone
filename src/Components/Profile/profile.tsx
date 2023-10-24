import { useEffect, useState } from "react";
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
import axios from "axios";
import { useParams } from "react-router-dom";
import Tabs from "./tabs";
import Loader from "../loader";
import { followRecommendedUsers } from "../../Redux/feedSlice";
import useWindowSize from "../../Hooks/useWindowSize";
import { isOpen } from "../../Redux/postModalSlice";
import { IUser } from "../Comment/types";
import { IImages, IPost } from "../FeedCard/types";
import { getFullImageUrl } from "../../Helpers/img";
interface IProfile {
  ownAccount: boolean;
  userId?: number;
}

interface IUserProfile extends IUser {
  posts: {
    images: IImages[];
    post: IPost;
  }[];
}

const Profile: React.FC<IProfile> = ({ ownAccount }) => {
  const size = useWindowSize();
  const [active, setActive] = useState<string>("posts");
  const isPostModalOpen = useAppSelector(isOpen);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<IUserProfile | null>(null);

  const [buttonName, setButtonName] = useState<"Follow" | "Following">(
    "Follow"
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${id}`)
      .then((res) => {
        const btnName = res.data.user.isFollowing ? "Following" : "Follow";
        setUser(res.data.user);
        setIsLoading(false);
        setButtonName(btnName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, isPostModalOpen]);

  const handleFollow = () => {
    if (!user) return;

    if (buttonName === "Follow") {
      setButtonName("Following");
    } else {
      setButtonName("Follow");
    }

    dispatch(followRecommendedUsers(user.id) as any);
  };

  if (isLoading) {
    return <Loader />;
  }

  const isFollowing = buttonName === "Follow";

  const editBtnStyle = {
    backgroundColor: isFollowing ? "#0095f6" : "initial",
    color: isFollowing ? "white" : "initial",
  };

  const imgUrl = getFullImageUrl(user!.avatar);

  return (
    <>
      <Section>
        <Container>
          <Avatar src={imgUrl} />
          <ProfileDetails>
            <TopRow>
              <Username>{user!.username}</Username>
              <EditButton onClick={handleFollow} style={editBtnStyle}>
                {buttonName}
              </EditButton>
            </TopRow>
            {(size.width as number) > 980 && (
              <>
                <MiddleRow>
                  <Posts>
                    <span>{user!.posts.length}</span> Posts
                  </Posts>
                  <Followers>
                    <span>{user!.followers}</span> Followers
                  </Followers>
                  <Following>
                    <span>{user!.following}</span> Following
                  </Following>
                </MiddleRow>
                <FullName>{user!.fullName}</FullName>
              </>
            )}
          </ProfileDetails>
        </Container>
        <Tabs ownAccount={ownAccount} active={active} setActive={setActive} />
        <BottomContainer>
          {user?.posts.map((post, x) => {
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
