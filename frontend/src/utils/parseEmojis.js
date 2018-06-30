import { toArray } from "react-emoji-render";

const parseEmojis = text => {
  const emojisArray = toArray(text);
  const newValue = emojisArray.reduce((previous, current) => {
    if (typeof current === "string") return previous + current;
    return previous + current.props.children;
  }, "");
  return newValue;
};

export default parseEmojis;
