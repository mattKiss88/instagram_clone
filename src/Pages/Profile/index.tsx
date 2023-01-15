import React, { Suspense, lazy } from "react";
import Loader from "../../Components/loader";
const Profile = lazy(() => import("../../Components/Profile"));

const UserProfile = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Profile />
    </Suspense>
  );
};

export default UserProfile;
