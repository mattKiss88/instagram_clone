import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Feed from "../../Containers/Feed";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { increment } from "../../Redux/counter";
import { isOpen, toggleModal } from "../../Redux/modalSlice";
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<string>("");
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(isOpen);

  const addPhoto = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", "hey jude");
    formData.append("userId", "1");

    const res = await axios.post("http://localhost:3001/post", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  const getPhoto = async () => {
    const res = await axios.get(
      "http://localhost:3001/post/image/bce0b3cc8ff73305644d6bf281b8ece6"
    );

    console.log(res.data);
  };

  useEffect(() => {
    axios
      .post("http://localhost:3001/auth/login", {
        email: "matt.kiss96@gmail.com",
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  const onChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const incrementIt = () => {
    dispatch(increment());
  };

  console.log(isModalOpen);

  const signUp = async () => {
    await axios
      .post("http://localhost:3001/auth/signup", {
        email: "matt.kiss96@gmail.com",
        password: "hello",
        username: "theRomanian",
        fullName: "Matt Kiss",
        bio: "I am the creator of the universe",
        dob: "10/10/2000",
      })
      .then((res) => {
        console.log(res.data);
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
      <button onClick={incrementIt}>increment</button>
      <button onClick={() => dispatch(toggleModal())}>open modal</button>
      <button onClick={getPhoto}>get image</button>
    </div>
  );
};

export default Home;
