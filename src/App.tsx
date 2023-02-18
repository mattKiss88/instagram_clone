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

function App() {
  const isModalOpen = useAppSelector(isOpen);
  const [isMount, setIsMount] = useState(false);
  const dispatch = useAppDispatch();
  const ViewPostModal = lazy(() => import("./Containers/ViewPostModal"));
  const token = useAppSelector((state) => state.userAccount.token);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/3`)
      .then((res) => {
        console.log(res.data.user, "user");
        dispatch(getUserData(res.data.user));
      })
      .catch((err) => {
        console.log(err);
      });

    if (!token) {
      navigate("/login");
    }
  }, []);

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
      </Routes>
      {/* </Router> */}
      <Suspense fallback={<Loader />}>
        {isModalOpen && <ViewPostModal />}
      </Suspense>
    </div>
  );
}

export default App;
