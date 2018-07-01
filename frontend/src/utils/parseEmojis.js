import { toArray } from "react-emoji-render";

/**
 * Auto parses text to emoji unicode.
 * For example:
 * 		":)" 			 	=> "😃"
 * 		":rocket:" 	=> "🚀"
 * @constructor
 * @param {string} text - The text to be parsed
 */
const parseEmojis = text => {
  const emojisArray = toArray(text);
  const newValue = emojisArray.reduce((previous, current) => {
    if (typeof current === "string") return previous + current;
    return previous + current.props.children;
  }, "");
  return newValue;
};

export default parseEmojis;
