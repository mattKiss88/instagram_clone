import { randEmail, randFullName } from "@ngneat/falso";
import one from "../../Assets/1.jpg";
import two from "../../Assets/2.jpg";
import three from "../../Assets/3.jpg";
import four from "../../Assets/4.jpg";
import five from "../../Assets/5.jpg";
import six from "../../Assets/6.jpg";
import seven from "../../Assets/7.jpg";

const seedData: any = [
  {
    fullName: randFullName(),
    email: randEmail(),
    avatar: "https://i.pravatar.cc/150?img=1",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: seven,
    likes: 123,
  },
  {
    fullName: randFullName(),
    email: randEmail(),
    avatar: "https://i.pravatar.cc/150?img=2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.csdsdf sdf sdf dsf dsf dsf dsf dsf dsfsdf sdfdsfdsf dsfdsfsdf dsfsdfds dsfdsfsdf dsfdsfsd dsfs",
    image: two,
    likes: 123000,
  },
  {
    fullName: randFullName(),
    email: randEmail(),
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: three,
    likes: 180,
  },
  {
    fullName: randFullName(),
    email: randEmail(),
    avatar: "https://i.pravatar.cc/150?img=4",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: four,
    likes: 13,
  },
  {
    fullName: randFullName(),
    email: randEmail(),
    avatar: "https://i.pravatar.cc/150?img=5",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: five,
    likes: 3,
  },
  {
    fullName: randFullName(),
    email: randEmail(),
    avatar: "https://i.pravatar.cc/150?img=6",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: six,
    likes: 130,
  },
  {
    fullName: randFullName(),
    email: randEmail(),
    avatar: "https://i.pravatar.cc/150?img=7",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: one,
    likes: 112,
  },
];

export { seedData };
