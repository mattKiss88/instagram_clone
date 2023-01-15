import { useEffect, useState, Suspense, lazy } from "react";
import Navbar from "../../Components/Navbar";
import Feed from "../../Containers/Feed";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { increment } from "../../Redux/counter";
import { isOpen, toggleModal } from "../../Redux/modalSlice";
import Loader from "../../Components/loader";
const Home = () => {
  const [image, setImage] = useState<string>("");
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(isOpen);

  const Navbar = lazy(() => import("../../Components/Navbar"));
  const Feed = lazy(() => import("../../Containers/Feed"));

  // const addPhoto = async () => {
  //   const formData = new FormData();
  //   formData.append("image", image);
  //   formData.append("caption", "hellooooooooooooo guys");
  //   formData.append("userId", "4");

  //   const res = await axios.post("http://localhost:3001/post", formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  // };

  const onChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  // const signUp = async () => {
  //   const formData = new FormData();
  //   formData.append("image", image);

  //   let data = {
  //     email: "matt@gmail.com",
  //     password: "password123",
  //     username: "matt123",
  //     fullName: "matt",
  //     dob: "1981-12-02",
  //     bio: "i am a poet",
  //   };

  //   formData.append("userData", JSON.stringify(data));

  //   console.log(formData);

  //   await axios.post("http://localhost:3001/auth/signup", formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  // };
  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Navbar />
        <Feed />
      </div>
    </Suspense>
  );
};

export default Home;
