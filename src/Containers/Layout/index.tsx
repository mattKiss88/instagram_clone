import React, { Suspense } from "react";
import { Wrapper } from "./styles";
import { JsxElement } from "typescript";
import Loader from "../../Components/loader";
import { useAppSelector } from "../../Redux/hooks";
import { isOpen } from "../../Redux/postModalSlice";
import { isModalOpen } from "../../Redux/createPostModalSlice";
import { isPostSettingsModalOpen } from "../../Redux/postSettingsSlice";
import { isUnfollowModalOpen } from "../../Redux/unfollowModalSlice";
import CreatePostModal from "../CreatePostModal";
import PostSettingsModal from "../PostSettingsModal";
import UnfollowModal from "../UnfollowModal";
import ViewPostModal from "../ViewPostModal";
import ViewPostModalMobile from "../ViewPostModal/mobile";
import useWindowSize from "../../Hooks/useWindowSize";
import TopNavMobile from "../../Components/SideBar/mobile/top";
import NavbarMb from "../../Components/SideBar/mobile/mobile";
import Navbar from "../../Components/SideBar";
// import { isOpen } from "./Redux/postModalSlice";

interface ILayoutProps {
  children: any;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const isPostModalOpen: boolean = useAppSelector(isOpen);
  const isCreatePostModalOpen: boolean = useAppSelector(isModalOpen);
  const isPostSettingsOpen: boolean = useAppSelector(isPostSettingsModalOpen);
  const isUnFollowModalOpen: boolean = useAppSelector(isUnfollowModalOpen);

  const size = useWindowSize();

  const isMobile = (size.width as number) < 700;
  const isDesktop = !isMobile;
  const modalIsOpen = isPostModalOpen || isCreatePostModalOpen;

  return (
    <Wrapper>
      {isMobile && !modalIsOpen && <TopNavMobile />}
      {isMobile ? <NavbarMb /> : <Navbar />}
      {children}
      <Suspense fallback={<Loader />}>
        {isPostModalOpen && (
          <>{isMobile ? <ViewPostModalMobile /> : <ViewPostModal />}</>
        )}
        {isCreatePostModalOpen && <CreatePostModal />}
        {isPostSettingsOpen && <PostSettingsModal />}
        {isUnFollowModalOpen && <UnfollowModal />}
      </Suspense>
    </Wrapper>
  );
};

export default Layout;
