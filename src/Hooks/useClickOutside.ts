import * as React from "react";
import { isOpen } from "../Redux/postModalSlice";
import { useAppSelector } from "../Redux/hooks";
import { isPostSettingsModalOpen } from "../Redux/postSettingsSlice";

export const useIsClickOutside = (initialState: boolean) => {
  const ref: any = React.useRef(null);
  const isModalOpen = useAppSelector(isOpen);
  const [isClickOutside, setisClickOutside] = React.useState(initialState);
  const isSettingsOpen: boolean = useAppSelector(isPostSettingsModalOpen);

  const handleClickOutside = (event: MouseEvent): void => {
    // console.log(event.target.className, "event.target");
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !(event.target as any).className.includes("ReactModal")
    ) {
      setisClickOutside(true);
    }
    console.log((event.target as any).className, "event");
  };

  // event.target.className === "postSettingsModal"

  React.useEffect(() => {
    if (!isModalOpen && isClickOutside) {
      setisClickOutside(false);
    }
  }, [isModalOpen]);

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isClickOutside, setisClickOutside };
};
