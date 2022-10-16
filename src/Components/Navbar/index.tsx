import React from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { Logo, Section } from "./styles";
import logo from "../../Assets/instagram-text-icon.png";

const Navbar = () => {
  return (
    <Section>
      <Logo alt="Instagram" src={logo} />
    </Section>
  );
};

export default Navbar;
