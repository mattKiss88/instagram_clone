import styled from "styled-components";
import phones from "../../Assets/insta-login.png";

const containerStyles = `
border: 1px solid #dbdbdb;
background-color: #fff;
border-radius: 1px;
`;

export const Section = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export const ImageContainer = styled.div`
  width: 450px;
  height: 615px;
  background-image: url(${phones});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const style = `
width: 250px;
height: 538px;
position: absolute;
right: 5.2rem;
top: 1.5rem;
`;

export const Img1 = styled.img<{ order: number }>`
  ${style}
  opacity: ${({ order }) => (order === 1 ? 1 : 0)};
  transition: opacity 1.5s ease-in-out;
  z-index: ${({ order }) => (order === 1 ? 1 : 0)};
`;

export const Img2 = styled.img`
  ${style}
  opacity: 0;
`;

export const Img3 = styled.img`
  ${style}
  opacity: 0;
`;

export const FormContainer = styled.div`
  max-width: 350px;
  padding: 10px 0;
  margin: 0 20px;
  width: 50%;

  .logo {
    width: 175px;
    margin: 40px auto;
    display: block;
  }
`;

export const Input = styled.input`
  border: 1px solid #dbdbdb;
  border-radius: 1px;
  padding: 10px;
  margin: 10px auto;
  background-color: #fafafa;
  width: 90%;
  display: block;
`;

export const LoginBtn = styled.button`
  color: white;
  border: 1px solid #dbdbdb;
  border-radius: 1rem;
  padding: 10px;
  margin: 10px auto;
  background-color: #1977f2;
  width: 90%;
  display: block;
  opacity: 0.8;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.6rem;
`;

export const ForgotPassword = styled.button`
  color: darkblue;
  border-radius: 1rem;
  padding: 10px;
  margin: 10px auto;
  width: 90%;
  display: block;
  font-weight: 500;
  cursor: pointer;
  font-size: 1.4rem;
`;

export const Top = styled.form`
  ${containerStyles}
  width: 100%;
`;
export const Bottom = styled.div`
  ${containerStyles}
  width: 100%;
  margin-top: 10px;
`;

export const NoAccount = styled.p`
  padding: 20px 0;
  text-align: center;

  a {
    color: #1977f2;
    font-weight: bold;
    text-decoration: none;
    font-size: 1.4rem;
  }
`;
