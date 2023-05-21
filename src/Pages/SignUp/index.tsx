import React, { useState } from "react";
import { Container, Input, Subheader, Top } from "./styles";
import logo from "../../Assets/instagram-text-icon.png";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { Bottom, LoginBtn as SignUpBtn, NoAccount as P } from "../Login/styles";
import { Link } from "react-router-dom";
import { signUpUser } from "../../Redux/userAccountSlice";
import { Notify } from "notiflix";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface IForm {
  email: string;
  fullName: string;
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  fullName: Yup.string(),
  username: Yup.string()
    .required("Required")
    .matches(/^\S*$/, "No spaces allowed"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const SignUp: React.FC = () => {
  const [signUpDetails, setSignUpDetails] = useState<IForm>({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    username: false,
    password: false,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrors({ email: false, username: false, password: false }); // reset the errors state
      await validationSchema.validate(signUpDetails);
      await dispatch(signUpUser(signUpDetails) as any);
      navigate("/");
    } catch (err: any) {
      Notify.failure(err.message);

      // Update errors state based on validation error
      if (err.path === "email") {
        setErrors((errors) => ({ ...errors, email: true }));
      } else if (err.path === "username") {
        setErrors((errors) => ({ ...errors, username: true }));
      } else if (err.path === "password") {
        setErrors((errors) => ({ ...errors, password: true }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpDetails({
      ...signUpDetails,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      // Validate only the email field
      await validationSchema.validateAt("email", signUpDetails);
      setErrors({ ...errors, email: false });
    } catch (err: any) {
      Notify.failure(err.message);
      setErrors({ ...errors, email: true });
    }
  };

  const handleUsernameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      // Validate only the username field
      await validationSchema.validateAt("username", signUpDetails);
      setErrors({ ...errors, username: false });
    } catch (err: any) {
      Notify.failure(err.message);
      setErrors({ ...errors, username: true });
    }
  };

  const handlePasswordBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      // Validate only the password field
      await validationSchema.validateAt("password", signUpDetails);
      setErrors({ ...errors, password: false });
    } catch (err: any) {
      Notify.failure(err.message);
      setErrors({ ...errors, password: true });
    }
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
          onBlur={handleEmailBlur}
          style={{ borderColor: errors.email ? "red" : "#dbdbdb" }}
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
          onBlur={handleUsernameBlur}
          name="username"
          style={{ borderColor: errors.username ? "red" : "#dbdbdb" }}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          onBlur={handlePasswordBlur}
          name="password"
          style={{ borderColor: errors.password ? "red" : "#dbdbdb" }}
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
