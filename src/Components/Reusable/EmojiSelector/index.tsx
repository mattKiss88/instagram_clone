import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Container } from "./styles";

function EmojiSelector() {
  return (
    <Container>
      <Picker
        data={data}
        onEmojiSelect={console.log}
        showPreview={false}
        showSkinTones={false}
        emojiTooltip={true}
        theme={"light"}
        // previewPosition={"none"}
      />
    </Container>
  );
}

export default EmojiSelector;
