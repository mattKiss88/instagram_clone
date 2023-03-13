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

function App() {
  const isPostModalOpen = useAppSelector(isOpen);
  const isCreatePostModalOpen = useAppSelector(isModalOpen);
  const dispatch = useAppDispatch();
  const ViewPostModal = lazy(() => import("./Containers/ViewPostModal"));
  const token = useAppSelector((state) => state.userAccount.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return (
    <div>
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/* </Router> */}
      <Suspense fallback={<Loader />}>
        {isPostModalOpen && <ViewPostModal />}
        {isCreatePostModalOpen && <CreatePostModal />}
      </Suspense>
    </div>
  );
}

export default App;
