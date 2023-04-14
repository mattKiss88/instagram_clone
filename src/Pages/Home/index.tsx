import { Suspense, lazy } from "react";
import Loader from "../../Components/loader";
import { FeedMemo } from "../../Containers/Feed";

const Home: React.FC = () => {
  // const Feed = lazy(() => import("../../Containers/Feed"));

  return (
    // <Suspense fallback={<Loader />}>
    <div>
      <FeedMemo show={true} />
    </div>
    // </Suspense>
  );
};

export default Home;
