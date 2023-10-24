import styled from "styled-components";

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "523px",
    height: "567px",
    borderRadius: "15px",
    padding: "0",
  },

  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

export function createModalStyle(
  modalWidth: string,
  modalHeight: string,
  viewWidth: number
) {
  return {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: modalWidth,
      minWidth: viewWidth > 500 ? "500px" : "auto",
      height: modalHeight,
      borderRadius: viewWidth < 500 ? "0px" : "15px",
      padding: "0",
      transition: viewWidth > 700 ? "all 0.5s ease-in-out" : "none",
    },

    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };
}
