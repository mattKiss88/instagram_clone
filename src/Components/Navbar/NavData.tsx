import {
  SearchIcon,
  PlusCircleIcon,
  UserCircleIcon,
  HeartIcon,
  PaperAirplaneIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { ReactElement } from "react";
const navData: { name: string; icon: ReactElement; pathName: string }[] = [
  {
    name: "Home",
    icon: <HomeIcon />,
    pathName: "/",
  },
  {
    name: "Search",
    icon: <SearchIcon />,
    pathName: "/explore",
  },
  // {
  //   name: "Message",
  //   icon: <PaperAirplaneIcon />,
  //   pathName: "/inbox",
  // },
  // {
  //   name: "Notification",
  //   icon: <HeartIcon />,
  //   pathName: "/",
  // },
  {
    name: "Create",
    icon: <PlusCircleIcon />,
    pathName: "/",
  },
  {
    name: "Profile",
    icon: <UserCircleIcon />,
    pathName: "/profile",
  },
];

export default navData;
