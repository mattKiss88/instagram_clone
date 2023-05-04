import { useState, useRef, useEffect } from "react";
import navData from "../../Navbar/NavData";
import {
  Bottom,
  // Right,
  IconContainer,
  Logo,
  Section,
  Top,
  // Center,
  Wrapper,
  // Search,
  // SearchContainer,
} from "../styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { toggleModal } from "../../../Redux/createPostModalSlice";
import { toggleModal as toggleViewPostModal } from "../../../Redux/postModalSlice";
import axios from "axios";
import { MenuIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import Search from "../../Search";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { LogoutIcon } from "@heroicons/react/outline";
import { persistor } from "../../../Redux/store";
import { Nav } from "./styles";

// arrow right on rectangle icon from heroicons react outline:
//

const NavbarMb: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isPostModalOpen = useAppSelector((state) => state.postModal.isOpen);
  const isCreatePostModalOpen = useAppSelector(
    (state) => state.createPost.active
  );

  const handleLinkClick = (name: string) => {
    if (isCreatePostModalOpen) {
      dispatch(toggleModal());
    }

    if (isPostModalOpen) {
      dispatch(toggleViewPostModal());
    }
    console.log("hereeeee");

    switch (name) {
      case "Home":
        return navigate("/");
      case "Search":
        return navigate("/search");
      case "Activity":
        return navigate("/activity");
      case "Profile":
        return navigate("/profile");
      case "Create":
        return dispatch(toggleModal());
      default:
        return navigate("/");
    }
    // location.pathname !== pathName && navigate(pathName);
  };

  const logOut = (): void => {
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
    navigate("/login");
  };

  return (
    <Nav>
      <div>
        {navData.map((item, i) => (
          <div key={i} onClick={() => handleLinkClick(item.name)}>
            {item.icon}
          </div>
        ))}
      </div>
    </Nav>
  );
};

export default NavbarMb;
