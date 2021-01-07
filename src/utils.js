import dictionary from './dictionary';

const getWord = () => {
  const wordIndex = Math.floor(Math.random() * dictionary.length);
  return dictionary[wordIndex].toUpperCase();
};

export const utils = {
  range: (count) => Array.from({ length: count }).map((value, index) => index),
  noop: () => undefined,
  getWord,
};
