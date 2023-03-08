import { BookmarkIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/outline";
import { ViewGridIcon } from "@heroicons/react/outline";
import React from "react";
import { ButtonContainer, PostBtn, SavedBtn, TaggedBtn } from "./styles";

interface TabProps {
  active: string;
  setActive: (active: string) => void;
  ownAccount: boolean;
}

const Tabs: React.FC<TabProps> = ({ active, setActive, ownAccount }) => {
  return (
    <ButtonContainer>
      <PostBtn active={active === "posts"} onClick={() => setActive("posts")}>
        <ViewGridIcon />
        <span>POSTS</span>
      </PostBtn>
      {ownAccount && (
        <SavedBtn
          active={active === "saved"}
          onClick={() => setActive("saved")}
        >
          <BookmarkIcon />
          <span>SAVED</span>
        </SavedBtn>
      )}

      <TaggedBtn
        active={active === "tagged"}
        onClick={() => setActive("tagged")}
      >
        <UserCircleIcon />
        <span>TAGGED</span>
      </TaggedBtn>
    </ButtonContainer>
  );
};

export default Tabs;
