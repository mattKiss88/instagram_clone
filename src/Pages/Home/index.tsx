import { Suspense, lazy } from "react";
import Loader from "../../Components/loader";

const Home = () => {
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
