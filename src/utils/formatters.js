import he from "he";

const newlineSymbol = he.decode('&crarr;');

export const replaceNewlineWithSymbol = (item => item.replace(/\n/gi, ` ${newlineSymbol} `));
