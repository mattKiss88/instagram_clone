import { useEffect, useState, Suspense, lazy } from "react";
import Navbar from "../../Components/Navbar";
import Feed from "../../Containers/Feed";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { increment } from "../../Redux/counter";
import { isOpen, toggleModal } from "../../Redux/modalSlice";
import Loader from "../../Components/loader";
const Home = () => {
  const dispatch = useAppDispatch();

  const Navbar = lazy(() => import("../../Components/Navbar"));
  const Feed = lazy(() => import("../../Containers/Feed"));

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
