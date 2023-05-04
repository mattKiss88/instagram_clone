import "./App.css";
import Home from "./Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { isOpen } from "./Redux/postModalSlice";
import { Suspense, useEffect, useState, lazy } from "react";
import axios from "axios";
import MyProfile from "./Pages/Profile";
import Loader from "./Components/loader";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import UserProfile from "./Pages/UserProfile";
import { isModalOpen } from "./Redux/createPostModalSlice";
import CreatePostModal from "./Containers/CreatePostModal";
import { Wrapper } from "./styles";
import Navbar from "./Components/SideBar";
import useWindowSize from "./Hooks/useWindowSize";
import NavbarMb from "./Components/SideBar/mobile/mobile";
import ViewPostModalMobile from "./Containers/ViewPostModal/mobile";
import TopNavMobile from "./Components/SideBar/mobile/top";
import PostSettingsModal from "./Containers/PostSettingsModal";
import { isPostSettingsModalOpen } from "./Redux/postSettingsSlice";
import { isUnfollowModalOpen } from "./Redux/unfollowModalSlice";
import UnfollowModal from "./Containers/UnfollowModal";
function App() {
  const isPostModalOpen: boolean = useAppSelector(isOpen);
  const isCreatePostModalOpen: boolean = useAppSelector(isModalOpen);
  const isPostSettingsOpen: boolean = useAppSelector(isPostSettingsModalOpen);
  const isUnFollowModalOpen: boolean = useAppSelector(isUnfollowModalOpen);

  const ViewPostModal = lazy(() => import("./Containers/ViewPostModal"));
  const token = useAppSelector((state) => state.userAccount.token);
  const navigate = useNavigate();
  const size = useWindowSize();

  useEffect(() => {
    if (!token && window.location.pathname !== "/signup") {
      navigate("/login");
    }
  }, []);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  interface ModalProps {
    children: React.ReactNode;
  }

  // const Modal: React.FC<ModalProps> = ({ children }: any) => {
  //   const [modalContainer] = useState(() => document.createElement("div"));

  //   useEffect(() => {
  //     document.body.appendChild(modalContainer);
  //     return () => {
  //       document.body.removeChild(modalContainer);
  //     };
  //   }, [modalContainer]);

  //   return ReactDOM.createPortal(children, modalContainer);
  // };

  return (
    <div>
      {/* <Router> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Wrapper>
        {token &&
          (size.width as number) < 700 &&
          !isPostModalOpen &&
          !isCreatePostModalOpen && <TopNavMobile />}
        {token && ((size.width as number) < 700 ? <NavbarMb /> : <Navbar />)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/profile/:id" element={<UserProfile />} />
        </Routes>
      </Wrapper>
      {/* </Router> */}
      <Suspense fallback={<Loader />}>
        {isPostModalOpen && (
          <>
            {(size.width as number) < 600 ? (
              <ViewPostModalMobile />
            ) : (
              <ViewPostModal />
            )}
          </>
        )}
        {isCreatePostModalOpen && <CreatePostModal />}
        {isPostSettingsOpen && <PostSettingsModal />}
        {isUnFollowModalOpen && <UnfollowModal />}
      </Suspense>
    </div>
  );
}

export default App;
