import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import ViewPostModal from "./Containers/ViewPostModal";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { isOpen, toggleModal } from "./Redux/modalSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUserData } from "./Redux/userAccountSlice";

function App() {
  const isModalOpen = useAppSelector(isOpen);
  const [isMount, setIsMount] = useState(false);
  const user = useAppSelector((state) => state.userAccount);
  const dispatch = useAppDispatch();

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

  console.log("in here");

  useEffect(() => {
    setIsMount(true);

    return () => setIsMount(false);
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>

      {isModalOpen && <ViewPostModal />}
    </div>
  );
}

export default App;
