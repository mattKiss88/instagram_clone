import React, { useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { loginUser } from "../../Redux/userAccountSlice";
import {
  Bottom,
  ForgotPassword,
  FormContainer,
  Top,
  Input,
  LoginBtn,
  NoAccount,
} from "./styles";
import logo from "../../Assets/instagram-text-icon.png";
import { Link } from "react-router-dom";
import { Notify } from "notiflix";
import { useNavigate } from "react-router-dom";

interface IForm {
  email: string;
  password: string;
}

const Form: React.FC = () => {
  const [userDetails, setUserDetails] = useState<IForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let res = await dispatch(loginUser(userDetails) as any);
    if (res?.type === "userAccount/loginUserStatus/fulfilled") {
      return navigate("/");
    }

    return Notify.failure(`${res.payload}`);
    // setError(res.payload)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  return (
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
        <LoginBtn type="submit">Log in</LoginBtn>
        <ForgotPassword type="button">Forgotten your password?</ForgotPassword>
      </Top>
      <Bottom>
        <NoAccount>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </NoAccount>
      </Bottom>
    </FormContainer>
  );
};

export default Form;
