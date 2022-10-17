import React from "react";
import { MenuIcon } from "@heroicons/react/outline";
import navData from "./NavData";
import { Bottom, IconContainer, Logo, Section, Top, Wrapper } from "./styles";
import logo from "../../Assets/instagram-text-icon.png";

const Navbar = () => {
  return (
    <Section>
      <Logo alt="Instagram" src={logo} />
      <Wrapper>
        <Top>
          {navData.map((item, i) => (
            <IconContainer key={item.name}>
              <>{item.icon}</>
            </IconContainer>
          ))}
        </Top>
        <Bottom>
          <IconContainer>
            <MenuIcon />,
          </IconContainer>
        </Bottom>
      </Wrapper>
    </Section>
  );
};

export default Navbar;
