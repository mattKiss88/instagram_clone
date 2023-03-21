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

const StepTwo = () => {
  const newImg = useAppSelector(newImage);
  const step = useAppSelector(currentStep);
  const editor = React.createRef<AvatarEditor>();
  const [active, setActive] = useState<string>("");
  const userAccount = useAppSelector((state) => state.userAccount);
  const dispatch = useAppDispatch();
  console.log(userAccount, "userAccount");

  const [state, setState] = useState<any>({
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
    setState({ ...state, position });
  };

  const handleFilterClick = (e: any, filter: string) => {
    dispatch(updateFilter(filter));
    setActive(filter);
    setState({ ...state, className: `filter-${filter}` });
  };

  const handleCaption = (e: any) => {
    dispatch(updateCaption(e.target.value));
  };

  const handleSave = () => {
    const canvasimg = editor?.current?.getImage()?.toDataURL();
    dispatch(addFinalImageUrl(canvasimg!));
    console.log(canvasimg, "999");
    const file = dataURLtoFile(canvasimg!, "test.png");
    dispatch(addFinalImage(file));

    return canvasimg;
  };

  useEffect(() => {
    console.log("step 3", newImg);

    if (step === 3 && newImg instanceof File) {
      setState({ ...state, image: handleSave() });
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
          scale={parseFloat(state.scale)}
          width={state.width}
          height={state.height}
          position={state.position}
          onPositionChange={handlePositionChange}
          rotate={parseFloat(state.rotate)}
          borderRadius={state.width / (100 / state.borderRadius)}
          border={[0, 0, 0, 0]}
          image={state.image}
          ref={editor}
          crossOrigin={state.crossOrigin}
          className={state.className}
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
