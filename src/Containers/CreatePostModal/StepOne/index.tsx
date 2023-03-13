import React, { useEffect, useState } from "react";
import media from "../../../Assets/mediaIcon.svg";
import { P, StepOneCtn, UploadBtn } from "./styles";
import { FileUploader } from "react-drag-drop-files";
import DropArea from "./dropArea";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  addImage,
  newImage,
  setStep,
} from "../../../Redux/createPostModalSlice";

const fileTypes = ["JPG", "PNG", "GIF"];

const StepOne = () => {
  const newImg = useAppSelector(newImage);
  const dispatch = useAppDispatch();
  const handleChange = (file: File | null) => {
    file && dispatch(addImage(file));
  };

  useEffect(() => {
    newImg && dispatch(setStep(2));
  }, [newImg]);

  return (
    <StepOneCtn>
      <img src={media} />
      <P>Drag photos and videos here</P>
      <UploadBtn
        type="file"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e?.target?.files?.[0] || null)
        }
      />
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        children={<DropArea />}
        hoverTitle=" "
      />
    </StepOneCtn>
  );
};

export default StepOne;
