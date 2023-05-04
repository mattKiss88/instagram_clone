import { Suspense, lazy } from "react";
import Loader from "../../Components/loader";
const Profile = lazy(() => import("../../Components/Profile/myProfile"));

const MyProfile: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Profile ownAccount={true} />
    </Suspense>
  );
};

export default MyProfile;
