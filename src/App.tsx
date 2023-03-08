import "./App.css";
import Home from "./Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { isOpen } from "./Redux/modalSlice";
import { Suspense, useEffect, useState, lazy } from "react";
import axios from "axios";
import MyProfile from "./Pages/Profile";
import Loader from "./Components/loader";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import UserProfile from "./Pages/UserProfile";

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
        <Route path="/profile" element={<MyProfile />} />
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
