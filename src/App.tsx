import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import ViewPostModal from "./Containers/ViewPostModal";
import { useAppSelector } from "./Redux/hooks";
import { isOpen, toggleModal } from "./Redux/modalSlice";

function App() {
  const isModalOpen = useAppSelector(isOpen);

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
