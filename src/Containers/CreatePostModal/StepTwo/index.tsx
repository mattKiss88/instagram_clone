import React, { useEffect, useState } from "react";
import { currentStep, newImage } from "../../../Redux/createPostModalSlice";
import { useAppSelector } from "../../../Redux/hooks";
import {
  FilterCtn,
  FilterImg,
  FilterImgCtn,
  ImageCtn,
  InnerCtn,
  StepTwoCtn,
  Wrapper,
} from "./styles";
import AvatarEditor from "react-avatar-editor";
import { filters } from "./filterData";
import filterImg from "../../../Assets/filterImg.jpeg";

const StepTwo = () => {
  const newImg = useAppSelector(newImage);
  const step = useAppSelector(currentStep);
  const editor = React.createRef<AvatarEditor>();
  const [active, setActive] = useState<string>("");

  const [state, setState] = useState<any>({
    image: newImg,
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

  const handleScale = (e: any) => {
    const scale = parseFloat(e.target.value);
    setState({ ...state, scale: scale });
  };

  const handleFilterClick = (e: any, filter: string) => {
    const filterStyle = e.target.className.split(" ")[2];
    const yoo = e.target.className;
    console.log(yoo, "filter");
    setActive(filter);
    setState({ ...state, className: `filter-${filter}` });

    //   const element: any = document.querySelector(`.${filterStyle}`);
    //   const style = getComputedStyle(element);
    //   console.log(style, "style");
  };

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
        <InnerCtn>
          {filters.map((filter: string) => {
            console.log(filter, "filterz");
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
      </FilterCtn>
    </StepTwoCtn>
  );
};

export default StepTwo;
