import {
  SearchIcon,
  PlusCircleIcon,
  UserCircleIcon,
  HeartIcon,
  PaperAirplaneIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { ReactComponentElement } from "react";
const navData: { name: string; icon: any; pathName: string }[] = [
  {
    name: "Home",
    icon: <HomeIcon />,
    pathName: "/",
  },
  {
    name: "Explore",
    icon: <SearchIcon />,
    pathName: "/explore",
  },
  {
    name: "Message",
    icon: <PaperAirplaneIcon />,
    pathName: "/inbox",
  },
  {
    name: "Notification",
    icon: <HeartIcon />,
    pathName: "/",
  },
  {
    name: "Create",
    icon: <PlusCircleIcon />,
    pathName: "/",
  },
  {
    name: "profile",
    icon: <UserCircleIcon />,
    pathName: "/:username",
  },
];

export default navData;
