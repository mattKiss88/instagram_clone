import React, { useEffect } from "react";
import {
  Bottom,
  ForgotPassword,
  FormContainer,
  ImageContainer,
  Img1,
  Img2,
  Img3,
  Input,
  LoginBtn,
  NoAccount,
  Section,
  Top,
} from "./styles";
import phones from "../../Assets/insta-login.png";
import logo from "../../Assets/instagram-text-icon.png";
import { Link } from "react-router-dom";
import ss1 from "../../Assets/screenshot1.png";
import ss2 from "../../Assets/screenshot2.png";
import ss3 from "../../Assets/screenshot3.png";
import { useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { loginUser } from "../../Redux/userAccountSlice";

const Login = () => {
  const [activeImg, setActiveImg] = useState(1);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeImg === 1) {
        setActiveImg(2);
      } else if (activeImg === 2) {
        setActiveImg(3);
      } else {
        setActiveImg(1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeImg]);

  const orderImages = (img: number) => {
    if (img === activeImg) {
      return 1;
    } else if (img === activeImg - 1 || (img === 3 && activeImg === 1)) {
      return 2;
    } else {
      return 3;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(userDetails) as any);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <Section>
      <ImageContainer>
        <Img1 src={ss1} order={orderImages(1)} />
        <Img1 src={ss2} order={orderImages(2)} />
        <Img1 src={ss3} order={orderImages(3)} />
      </ImageContainer>
      <FormContainer>
        <Top onSubmit={handleSubmit}>
          <img src={logo} className="logo" />
          <Input
            type="text"
            placeholder="Phone number, username, or email"
            onChange={handleChange}
            name="email"
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
          />
          <LoginBtn>Log in</LoginBtn>
          <ForgotPassword>Forgotten your password?</ForgotPassword>
        </Top>
        <Bottom>
          <NoAccount>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </NoAccount>
        </Bottom>
      </FormContainer>
    </Section>
  );
};

export default Login;
