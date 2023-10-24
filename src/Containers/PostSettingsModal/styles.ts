import styled from "styled-components";

export const Btn = styled.button`
  background: transparent;
  border-bottom: 1px solid #dbdbdb;
  color: #262626;
  width: 100%;
  padding: 1.5rem 0;
  font-weight: 500;
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
