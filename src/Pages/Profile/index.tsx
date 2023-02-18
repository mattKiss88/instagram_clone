import React, { Suspense, lazy } from "react";
import Loader from "../../Components/loader";
const Profile = lazy(() => import("../../Components/Profile"));

const UserProfile = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Profile ownAccount={true} />
    </Suspense>
  );
};

export default UserProfile;
