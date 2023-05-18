import { useEffect, useState } from "react";
import { ImageContainer, Img1, Section } from "./styles";
import ss1 from "../../Assets/screenshot1.png";
import ss2 from "../../Assets/screenshot2.png";
import ss3 from "../../Assets/screenshot3.png";
import Form from "./form";
import useWindowSize from "../../Hooks/useWindowSize";
import WelcomeModal from "../../Containers/WelcomeModal";
const Login = () => {
  const [activeImg, setActiveImg] = useState<1 | 2 | 3>(1);
  const { width } = useWindowSize();
  const showWelcomeModal = !!localStorage.getItem("welcomeModal");

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeImg === 1) {
        setActiveImg(2);
      } else if (activeImg === 2) {
        setActiveImg(3);
      } else {
        setActiveImg(1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeImg]);

  const orderImages = (img: number): number => {
    if (img === activeImg) {
      return 1;
    } else if (img === activeImg - 1 || (img === 3 && activeImg === 1)) {
      return 2;
    } else {
      return 3;
    }
  };

  return (
    <Section>
      {(width as number) > 860 && (
        <ImageContainer>
          <Img1 src={ss1} order={orderImages(1)} />
          <Img1 src={ss2} order={orderImages(2)} />
          <Img1 src={ss3} order={orderImages(3)} />
        </ImageContainer>
      )}
      {!showWelcomeModal && <WelcomeModal />}
      <Form />
    </Section>
  );
};

export default Login;
