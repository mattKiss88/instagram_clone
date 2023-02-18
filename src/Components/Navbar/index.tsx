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

const Navbar = () => {
  const [search, setSearch] = useState(false);
  const ref: any = useRef(null);
  const navigate = useNavigate();

  const onClickOutside = () => {
    setSearch(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref?.current?.contains(event.target)) {
        onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
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
              onClick={() => navigate(item.pathName)}
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
