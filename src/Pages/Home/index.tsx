import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Feed from "../../Containers/Feed";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { increment } from "../../Redux/counter";
import { isOpen, toggleModal } from "../../Redux/modalSlice";
const Home = () => {
  const [image, setImage] = useState<string>("");
  const [test, setTest] = useState<any>();
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(isOpen);

  const addPhoto = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", "hellooooooooooooo guys");
    formData.append("userId", "4");

    const res = await axios.post("http://localhost:3001/post", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const onChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const signUp = async () => {
    const formData = new FormData();
    formData.append("image", image);

    let data = {
      email: "jeezusweezus@gmail.com",
      password: "password123",
      username: "jeezusweezus",
      fullName: "edgar allan poe",
      dob: "2000-12-02",
      bio: "helloooooo chicken nugget",
    };

    formData.append("userData", JSON.stringify(data));

    console.log(formData);

    await axios.post("http://localhost:3001/auth/signup", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  return (
    <div>
      <Navbar />
      <Feed />
      <input
        type="file"
        name="photo"
        id="upload-photo"
        onChange={onChange}
        accept="image/png, image/jpeg"
      />
      <button onClick={addPhoto} style={{ marginTop: "100px" }}>
        submit
      </button>
      <button onClick={signUp}>create user</button>
    </div>
  );
};

export default Home;
