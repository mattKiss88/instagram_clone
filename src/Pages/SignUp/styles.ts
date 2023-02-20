import styled from "styled-components";

export const Input = styled.input`
  border: 1px solid #dbdbdb;
  border-radius: 1px;
  padding: 10px;
  margin: 10px auto;
  background-color: #fafafa;
  width: 90%;
  display: block;
`;

export const Container = styled.div`
  max-width: 350px;
  margin: 20px auto;

  .logo {
    width: 175px;
    margin: 40px auto;
    display: block;
  }
`;

export const Top = styled.form`
  border: 1px solid #dbdbdb;
  background-color: #fff;
  border-radius: 1px;
  max-width: 350px;
  padding: 25px;
  margin: 20px auto;

  .logo {
    width: 175px;
    margin: 40px auto 20px;
    display: block;
  }
`;

export const Subheader = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 800;
  margin: 10px 0 30px;
  color: rgba(var(--f52, 142, 142, 142), 1);
`;
