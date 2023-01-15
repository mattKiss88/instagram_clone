import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { isOpen, toggleModal } from "./Redux/modalSlice";
import { Suspense, useEffect, useState, lazy } from "react";
import axios from "axios";
import { getUserData } from "./Redux/userAccountSlice";
import UserProfile from "./Pages/Profile";
import Loader from "./Components/loader";

function App() {
  const isModalOpen = useAppSelector(isOpen);
  const [isMount, setIsMount] = useState(false);
  const user = useAppSelector((state) => state.userAccount);
  const dispatch = useAppDispatch();
  const ViewPostModal = lazy(() => import("./Containers/ViewPostModal"));

  console.log(user, "user");

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
  }, []);

  useEffect(() => {
    setIsMount(true);

    return () => setIsMount(false);
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
      <Suspense fallback={<Loader />}>
        {isModalOpen && <ViewPostModal />}
      </Suspense>
    </div>
  );
}

export default App;
