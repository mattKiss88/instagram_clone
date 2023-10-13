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
import { ButtonSpinner } from "../../Components/loader/styles";

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
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!userDetails.email || !userDetails.password) {
      setLoading(false);

      return Notify.failure("Please fill in all fields");
    }

    let res = await dispatch(loginUser(userDetails) as any);
    if (res?.type === "userAccount/loginUserStatus/fulfilled") {
      return navigate("/");
    }

    setLoading(false);

    console.log(res, "res23");

    return Notify.failure(
      `${
        res.payload.message
          ? res.payload.message
          : "Error, please try again later"
      } `
    );
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
          placeholder="Email"
          onChange={handleChange}
          name="email"
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
        />
        <LoginBtn type="submit" disabled={loading}>
          {loading ? <ButtonSpinner /> : "Log In"}
        </LoginBtn>
        <ForgotPassword type="button"></ForgotPassword>
        {/* <ForgotPassword type="button">Forgotten your password?</ForgotPassword> */}
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
