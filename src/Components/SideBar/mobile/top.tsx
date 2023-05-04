import React from "react";
import { TopNav } from "./styles";
import logo from "../../../Assets/instagram-text-icon.png";
import { useNavigate } from "react-router-dom";

const TopNavMobile = () => {
  const navigate = useNavigate();

  const onClickHandler = (): void => {
    navigate("/");
  };
  return (
    <TopNav>
      <img src={logo} onClick={onClickHandler} />
    </TopNav>
  );
};

export default TopNavMobile;
