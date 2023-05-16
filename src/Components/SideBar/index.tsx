import { useState, useRef, useEffect } from "react";
import navData from "../Navbar/NavData";
import {
  Bottom,
  // Right,
  IconContainer,
  Logo,
  LogoMini,
  Section,
  Top,
  // Center,
  Wrapper,
  // Search,
  // SearchContainer,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { isModalOpen, toggleModal } from "../../Redux/createPostModalSlice";
import axios from "axios";
import { MenuIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import Search from "../Search";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { LogoutIcon } from "@heroicons/react/outline";
import { persistor, resetState } from "../../Redux/store";
import logo from "../../Assets/instagram-text-icon.png";
import logoMini from "../../Assets/insta-logo-mini.svg";
// arrow right on rectangle icon from heroicons react outline:
//

const Navbar: React.FC = () => {
  const isCreatePostModalOpen: boolean = useAppSelector(isModalOpen);
  const [showSearch, setShowSearch] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchRef = useRef(null);

  const handleLinkClick = (e: any, name: string, pathName: string) => {
    if (name === "Search") {
      e.stopPropagation(); // Stop the event from reaching the document level
      return setShowSearch(true);
    }
    switch (name) {
      case "Home":
        return navigate("/");
      case "Search":
        return setShowSearch(true);
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
    persistor.purge().then(() => {
      dispatch(resetState());
      navigate("/login");
    });
  };

  const useOutsideClick = (ref: any, callback: any) => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };

  useOutsideClick(searchRef, () => {
    if (showSearch) {
      setShowSearch(false);
    }
  });
  return (
    <Section collapse={!!showSearch}>
      <Logo
        alt="Instagram"
        src={logo}
        onClick={() => navigate("/")}
        fadeOut={!!showSearch}
      />
      <LogoMini
        alt="Instagram"
        src={logoMini}
        onClick={() => navigate("/")}
        fadeOut={!!showSearch}
      />
      <Wrapper>
        <Top>
          {navData.map((item, i) => (
            <IconContainer
              key={item.name}
              onClick={(e) => handleLinkClick(e, item.name, item.pathName)}
              bold={
                item.name === "Create"
                  ? isCreatePostModalOpen
                  : location.pathname === item.pathName
              }
            >
              <>{item.icon}</>
              <p>{item.name}</p>
            </IconContainer>
          ))}
        </Top>
        <Bottom>
          <IconContainer onClick={logOut}>
            <LogoutIcon />
          </IconContainer>
        </Bottom>
      </Wrapper>
      <div ref={searchRef}>
        <Search setShowSearch={setShowSearch} showSearch={showSearch} />
      </div>
    </Section>
  );
};

export default Navbar;
