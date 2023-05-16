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
import { Suspense, useEffect, useState, lazy, useLayoutEffect } from "react";
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
import { useLocation } from "react-router-dom";
import ProtectedRoute from "./HOC/authRoute";
import Layout from "./Containers/Layout";

function App() {
  const isPostModalOpen: boolean = useAppSelector(isOpen);
  const isCreatePostModalOpen: boolean = useAppSelector(isModalOpen);
  const isPostSettingsOpen: boolean = useAppSelector(isPostSettingsModalOpen);
  const isUnFollowModalOpen: boolean = useAppSelector(isUnfollowModalOpen);

  const ViewPostModal = lazy(() => import("./Containers/ViewPostModal"));
  const token = useAppSelector((state) => state.userAccount.token);
  const navigate = useNavigate();
  const size = useWindowSize();
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const location = useLocation();
  const pathnames = ["/login", "/signup"];

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  interface ModalProps {
    children: React.ReactNode;
  }

  console.log(token, "token");

  useLayoutEffect(() => {
    if (pathnames.includes(location.pathname)) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location.pathname]);

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
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <MyProfile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <UserProfile />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
