import { randFullName, randParagraph } from "@ngneat/falso";

const commentArr: {}[] = [
  {
    fullName: randFullName(),
    avatar: "https://i.pravatar.cc/150?img=1",
    comment: randParagraph({ length: 2 }),
    likes: 123,
    timeStamp: "1h",
  },
  {
    fullName: randFullName(),
    avatar: "https://i.pravatar.cc/150?img=2",
    comment: randParagraph({ length: 2 }),
    likes: 123000,
    timeStamp: "1h",
  },
  {
    fullName: randFullName(),
    avatar: "https://i.pravatar.cc/150?img=3",
    comment: randParagraph({ length: 2 }),
    likes: 180,
    timeStamp: "1h",
  },
  {
    fullName: randFullName(),
    avatar: "https://i.pravatar.cc/150?img=4",
    comment: randParagraph({ length: 2 }),
    likes: 13,
    timeStamp: "1h",
  },
  {
    fullName: randFullName(),
    avatar: "https://i.pravatar.cc/150?img=5",
    comment: randParagraph({ length: 2 }),
    likes: 3,
    timeStamp: "1h",
  },
  {
    fullName: randFullName(),
    avatar: "https://i.pravatar.cc/150?img=6",
    comment: randParagraph({ length: 2 }),
    likes: 130,
    timeStamp: "1h",
  },
  {
    fullName: randFullName(),
    avatar: "https://i.pravatar.cc/150?img=7",
    comment: randParagraph({ length: 2 }),
    likes: 112,
    timeStamp: "1h",
  },
];

export { commentArr };
