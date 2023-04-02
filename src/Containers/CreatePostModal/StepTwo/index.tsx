import React, { useEffect, useState } from "react";
import {
  addFinalImage,
  addFinalImageUrl,
  currentStep,
  finalImage,
  finalImageUrl,
  newImage,
  resetImage,
  setStep,
  updateCaption,
  updateFilter,
} from "../../../Redux/createPostModalSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  Caption,
  CaptionCtn,
  FilterCtn,
  FilterImg,
  FilterImgCtn,
  ImageCtn,
  InnerCtn,
  StaticImage,
  StepTwoCtn,
  UserDetailsCtn,
  Wrapper,
} from "./styles";
import AvatarEditor from "react-avatar-editor";
import { filters } from "./filterData";
import filterImg from "../../../Assets/filterImg.jpeg";
import defaultPP from "../../../Assets/defaultPP.png";
import { dataURLtoFile } from "../ToDataUri";

interface IImageProps {
  image: string | File;
  allowZoomOut: boolean;
  position: { x: number; y: number };
  scale: number;
  rotate: number;
  borderRadius: number;
  preview: any;
  width: number;
  height: number;
  crossOrigin: string;
  style: any;
  className: string;
}

const StepTwo: React.FC = () => {
  const newImg = useAppSelector(newImage);
  const step = useAppSelector(currentStep);
  const editor = React.createRef<AvatarEditor>();
  const [active, setActive] = useState<string>("");
  const userAccount = useAppSelector((state) => state.userAccount);
  const dispatch = useAppDispatch();

  const [imageProperties, setImageProperties] = useState<IImageProps>({
    image: newImg || defaultPP,
    allowZoomOut: true,
    position: { x: 0.5, y: 0 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
    width: 523,
    height: 523,
    crossOrigin: "anonymous",
    style: {
      borderRadius: "15px",
    },
    className: "",
  });

  const handlePositionChange = async (position: any) => {
    setImageProperties({ ...imageProperties, position });
  };

  const handleFilterClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    filter: string
  ): void => {
    dispatch(updateFilter(filter));
    setActive(filter);
    setImageProperties({ ...imageProperties, className: `filter-${filter}` });
  };

  const handleCaption = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(updateCaption(e.target.value));
  };

  const handleSave = (): string => {
    const canvasimg = editor?.current?.getImage()?.toDataURL();
    dispatch(addFinalImageUrl(canvasimg!));
    const file = dataURLtoFile(canvasimg!, "test.png");
    dispatch(addFinalImage(file));

    return canvasimg || "";
  };

  useEffect(() => {
    if (step === 3 && newImg instanceof File) {
      setImageProperties({ ...imageProperties, image: handleSave() });
    }
  }, [step]);

  useEffect(() => {
    if (newImg instanceof File === false && step !== 1) {
      dispatch(setStep(1));
    }
  }, [step]);

  return (
    <StepTwoCtn>
      <ImageCtn>
        <AvatarEditor
          scale={imageProperties.scale}
          width={imageProperties.width}
          height={imageProperties.height}
          position={imageProperties.position}
          onPositionChange={handlePositionChange}
          rotate={imageProperties.rotate}
          borderRadius={
            imageProperties.width / (100 / imageProperties.borderRadius)
          }
          border={[0, 0, 0, 0]}
          image={imageProperties.image}
          ref={editor}
          crossOrigin={imageProperties.crossOrigin}
          className={imageProperties.className}
        />
      </ImageCtn>
      <FilterCtn active={step === 3 || step === 4}>
        {step === 3 ? (
          <InnerCtn>
            {filters.map((filter: string) => {
              return (
                <Wrapper
                  active={active === filter}
                  onClick={(e) => handleFilterClick(e, filter)}
                >
                  <FilterImgCtn className={`filter-${filter}`}>
                    <FilterImg src={filterImg} />
                  </FilterImgCtn>
                  <p>{filter}</p>
                </Wrapper>
              );
            })}
          </InnerCtn>
        ) : (
          <CaptionCtn>
            <UserDetailsCtn>
              <img src={userAccount.avatar || defaultPP} alt="profile" />
              <p>{userAccount.username}</p>
            </UserDetailsCtn>
            <Caption placeholder="Add a caption..." onChange={handleCaption} />
          </CaptionCtn>
        )}
      </FilterCtn>
    </StepTwoCtn>
  );
};

export default StepTwo;
