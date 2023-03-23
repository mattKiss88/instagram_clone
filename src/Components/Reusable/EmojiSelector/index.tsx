import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Container } from "./styles";

interface Props {
  onEmojiSelect: (emoji: any) => void;
  onClickOutside: () => void;
}

const EmojiSelector: React.FC<Props> = ({ onEmojiSelect, onClickOutside }) => {
  return (
    <Container>
      <Picker
        data={data}
        onEmojiSelect={onEmojiSelect}
        showPreview={false}
        showSkinTones={false}
        // emojiTooltip={true}
        theme={"light"}
        previewPosition={"none"}
        onClickOutside={onClickOutside}
      />
    </Container>
  );
};

export default EmojiSelector;
