import { useState, useRef, useEffect } from "react";
import navData from "../Navbar/NavData";
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
} from "./styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { toggleModal } from "../../Redux/createPostModalSlice";
import axios from "axios";
import { MenuIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import Search from "../Search";

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLinkClick = (name: string, pathName: string) => {
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

  return (
    <Section collapse={showSearch}>
      {/* <Logo alt="Instagram" src={logo} onClick={() => navigate("/")} /> */}
      <Wrapper>
        <Top>
          {navData.map((item, i) => (
            <IconContainer
              key={item.name}
              onClick={() => handleLinkClick(item.name, item.pathName)}
              bold={location.pathname === item.pathName}
            >
              <>{item.icon}</>
              <p>{item.name}</p>
            </IconContainer>
          ))}
        </Top>
        <Bottom>
          <IconContainer>
            <MenuIcon />,
          </IconContainer>
        </Bottom>
      </Wrapper>
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </Section>
  );
};

export default Navbar;
