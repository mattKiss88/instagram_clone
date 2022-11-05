import React from "react";
import Navbar from "../../Components/Navbar";
import Feed from "../../Containers/Feed";
import ViewPostModal from "../../Containers/ViewPostModal";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Feed />
      <ViewPostModal />
    </div>
  );
};

export default Home;
