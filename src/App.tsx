import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "./Redux/hooks";
import axios from "axios";
import MyProfile from "./Pages/Profile";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import UserProfile from "./Pages/UserProfile";
import ProtectedRoute from "./HOC/authRoute";
import Layout from "./Containers/Layout";

function App() {
  const token = useAppSelector((state) => state.userAccount.token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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
