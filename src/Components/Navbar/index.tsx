import { useState, useRef, useEffect } from "react";
import navData from "./NavData";
import {
  Right,
  IconContainer,
  Logo,
  Section,
  Center,
  Wrapper,
  Search,
  SearchContainer,
} from "./styles";
import logo from "../../Assets/instagram-text-icon.png";
import { SearchIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { toggleModal } from "../../Redux/createPostModalSlice";

const Navbar = () => {
  const [search, setSearch] = useState(false);
  const ref: any = useRef(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLinkClick = (name: string, pathName: string) => {
    if (name === "Create") {
      return dispatch(toggleModal());
    }

    navigate(pathName);
  };
  return (
    <Section>
      <Wrapper>
        <Logo alt="Instagram" src={logo} onClick={() => navigate("/")} />
        <Center>
          <SearchContainer>
            {!search && <SearchIcon style={{ width: "20px" }} />}
            <Search placeholder="Search" onClick={() => setSearch(true)} />
          </SearchContainer>
        </Center>
        <Right>
          {navData.map((item) => (
            <IconContainer
              key={item.name}
              onClick={() => handleLinkClick(item.name, item.pathName)}
            >
              <>{item.icon}</>
            </IconContainer>
          ))}
        </Right>
      </Wrapper>
    </Section>
  );
};

export default Navbar;
