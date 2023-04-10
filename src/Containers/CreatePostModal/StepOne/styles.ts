import styled from "styled-components";

export const P = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  width: max-content;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StepOneCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  > img {
    width: 120px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const DropAreaCtn = styled.div`
  width: 500px;
  height: 460px;
  background-color: transparent !important;
`;

export const UploadBtn = styled.input`
  color: white;
  border-radius: 1rem;
  border: none;
  padding: 10px;
  margin: 10px auto;
  background-color: #1977f2;
  display: block;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.6rem;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  ::-webkit-file-upload-button {
    visibility: hidden;
  }

  ::before {
    content: "Select From Computer";
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: #1977f2;
    border: none;
    border-radius: 5px;
    z-index: 1;
    width: 100%;
    height: 100%;
    text-align: center;
    left: 0;
    top: 0;
    line-height: 1;
    cursor: pointer;

    @media (max-width: 800px) {
      content: "Select Image";
    }
  }
`;
