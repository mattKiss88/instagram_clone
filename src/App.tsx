import "./App.css";
import Home from "./Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Profile from "./Components/Profile";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { isOpen, toggleModal } from "./Redux/modalSlice";
import { Suspense, useEffect, useState, lazy } from "react";
import axios from "axios";
import { getUserData } from "./Redux/userAccountSlice";
import UserProfile from "./Pages/Profile";
import Loader from "./Components/loader";
import ViewAccount from "./Components/ToolTips/ViewAccount";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  const isModalOpen = useAppSelector(isOpen);
  const [isMount, setIsMount] = useState(false);
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

  useEffect(() => {
    setIsMount(true);

    return () => setIsMount(false);
  }, []);

  return (
    <div>
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/* </Router> */}
      <Suspense fallback={<Loader />}>
        {isModalOpen && <ViewPostModal />}
      </Suspense>
    </div>
  );
}

export default App;
