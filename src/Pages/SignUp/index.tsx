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
import { ButtonSpinner } from "../../Components/loader/styles";

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

  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      setErrors({ email: false, username: false, password: false }); // reset the errors state
      await validationSchema.validate(signUpDetails, { abortEarly: false });

      const actionResult: any = await dispatch(
        signUpUser(signUpDetails) as any
      );

      if (signUpUser.fulfilled.match(actionResult)) {
        return navigate("/");
      }

      const errorMsg = (actionResult?.payload as any).message;

      console.log(errorMsg, "errorMsg");

      Notify.failure(errorMsg);

      switch (errorMsg) {
        case "Username already exists":
          setErrors((errors) => ({ ...errors, username: true }));
          break;
        case "Email already exists":
          setErrors((errors) => ({ ...errors, email: true }));
          break;
        default:
          break;
      }

      setLoading(false);
    } catch (err: any) {
      const errorArray = err.inner.map((a: any) => a.path);

      // remove duplicates from array
      const errorArrayFiltered = errorArray.filter(
        (item: string, index: number) => {
          return errorArray.indexOf(item) === index;
        }
      );

      // Update errors state based on validation error

      errorArrayFiltered.forEach((field: string) => {
        if (errorArrayFiltered.includes(field)) {
          setErrors((errors) => ({ ...errors, [field]: true }));
        }
      });
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      e.target.value = e.target.value.replace(/\s/g, "");
    }
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
      signUpDetails.email && Notify.failure(err.message);
      setErrors({ ...errors, email: true });
    }
  };

  const handleUsernameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      // Validate only the username field
      await validationSchema.validateAt("username", signUpDetails);
      setErrors({ ...errors, username: false });
    } catch (err: any) {
      signUpDetails.username && Notify.failure(err.message);
      setErrors({ ...errors, username: true });
    }
  };

  const handlePasswordBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      // Validate only the password field
      await validationSchema.validateAt("password", signUpDetails);
      setErrors({ ...errors, password: false });
    } catch (err: any) {
      signUpDetails.password && Notify.failure(err.message);
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
          value={signUpDetails.email}
        />
        <Input
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
          name="fullName"
          value={signUpDetails.fullName}
        />
        <Input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          onBlur={handleUsernameBlur}
          name="username"
          style={{ borderColor: errors.username ? "red" : "#dbdbdb" }}
          value={signUpDetails.username}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          onBlur={handlePasswordBlur}
          name="password"
          style={{ borderColor: errors.password ? "red" : "#dbdbdb" }}
          value={signUpDetails.password}
        />
        <SignUpBtn type="submit" disabled={loading}>
          {loading ? <ButtonSpinner /> : "Create Account"}
        </SignUpBtn>
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

// "inner":[{"value":"","path":"email","type":"required","errors":["Required"],
// "params":{"value":"","originalValue":"","path":"email","spec":{"strip":false,"strict":false,"abortEarly":true,"recursive":true,"nullable":false,"optional":false,"coerce":true}},
// "inner":[],"name":"ValidationError","message":"Required"},
// {"value":"","path":"username","type":"required","errors":["Required"],"params":{"value":"","originalValue":"","path":"username","spec":{"strip":false,"strict":false,"abortEarly":true,"recursive":true,"nullable":false,"optional":false,"coerce":true}},
// "inner":[],"name":"ValidationError","message":"Required"},
// {"value":"","path":"password","type":"min","errors":["Password must be at least 6 characters"],
// "params":{"value":"","originalValue":"","path":"password","spec":{"strip":false,"strict":false,"abortEarly":true,"recursive":true,"nullable":false,"optional":false,"coerce":true},"min":6},"inner":[],"name":"ValidationError","message":"Password must be at least 6 characters"},
// {"value":"","path":"password","type":"required","errors":["Required"],"params":{"value":"","originalValue":"","path":"password","spec":{"strip":false,"strict":false,"abortEarly":true,"recursive":true,"nullable":false,"optional":false,"coerce":true}},"inner":[],"name":"ValidationError","message":"Required"}]
