import { Suspense, lazy } from "react";
import Loader from "../../Components/loader";
const Profile = lazy(() => import("../../Components/Profile/profile"));

const UserProfile: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Profile ownAccount={false} />
    </Suspense>
  );
};

export default UserProfile;
