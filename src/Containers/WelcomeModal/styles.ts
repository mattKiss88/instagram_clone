import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.p`
  margin-bottom: 2.5rem;
`;

export const Title = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1.2;
`;

export const Button = styled.button`
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
  color: #fff;

  &:hover {
    opacity: 1;
  }
`;

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "min(90%, 500px)",
    height: "auto",
    borderRadius: "15px",
    padding: "25px",
  },

  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};
