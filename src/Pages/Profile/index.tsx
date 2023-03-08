import React, { Suspense, lazy } from "react";
import Loader from "../../Components/loader";
import EmojiSelector from "../../Components/Reusable/EmojiSelector";
const Profile = lazy(() => import("../../Components/Profile/myProfile"));

const MyProfile = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Profile ownAccount={true} />
      {/* <EmojiSelector /> */}
    </Suspense>
  );
};

export default MyProfile;
