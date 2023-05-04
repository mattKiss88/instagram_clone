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
import axios from "axios";

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLinkClick = (name: string, pathName: string) => {
    if (name === "Create") {
      return dispatch(toggleModal());
    }

    navigate(pathName);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (search.length > 2) {
      axios.get(`http://localhost:3001/user?search=${search}`).then((res) => {
        console.log(res.data);
      });
    }
  };

  return (
    <Section>
      <Wrapper>
        <Logo alt="Instagram" src={logo} onClick={() => navigate("/")} />
        <Center>
          <SearchContainer>
            {!showSearch && <SearchIcon style={{ width: "20px" }} />}
            <Search
              placeholder="Search"
              onClick={() => setShowSearch(true)}
              onChange={onSearchChange}
            />
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
