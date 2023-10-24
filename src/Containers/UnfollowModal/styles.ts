import styled from "styled-components";

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  object-fit: cover;
`;

export const P = styled.p`
  text-align: center;
  border-bottom: 1px solid #dbdbdb;
  padding: 25px 0;
`;

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "auto",
    borderRadius: "15px",
    padding: "0",
  },

  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  className: "ReactModal--content",
};
