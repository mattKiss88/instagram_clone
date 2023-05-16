import React, { useState } from "react";
import { Container, Input, Subheader, Top } from "./styles";
import logo from "../../Assets/instagram-text-icon.png";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { Bottom, LoginBtn as SignUpBtn, NoAccount as P } from "../Login/styles";
import { Link } from "react-router-dom";
import { signUpUser } from "../../Redux/userAccountSlice";
import { Notify } from "notiflix";
import { useNavigate } from "react-router-dom";

interface IForm {
  email: string;
  fullName: string;
  username: string;
  password: string;
}
const SignUp: React.FC = () => {
  const [signUpDetails, setSignUpDetails] = useState<IForm>({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  console.log(state);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let res = await dispatch(signUpUser(signUpDetails) as any);
      navigate("/");
    } catch {
      Notify.failure("Invalid username or password");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Top onSubmit={handleSubmit}>
        <img src={logo} className="logo" />
        <Subheader>
          Sign up to see photos and videos from your friends.
        </Subheader>
        <Input
          type="text"
          placeholder="Email Address"
          onChange={handleChange}
          name="email"
        />
        <Input
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
          name="fullName"
        />
        <Input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          name="username"
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
        />
        <SignUpBtn type="submit">Create Account</SignUpBtn>
      </Top>
      <Bottom>
        <P>
          Have an account? <Link to="/login">Sign In</Link>
        </P>
      </Bottom>
    </Container>
  );
};

export default SignUp;
