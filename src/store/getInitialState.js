import dictionary from '../dictionary';

const range = (count) => Array.from({ length: count }).map((value, index) => index);

const getWord = () => {
  const wordIndex = Math.floor(Math.random() * dictionary.length);
  return dictionary[wordIndex];
};

const makeCardState = (id) => ({
  id,
  word: getWord().toUpperCase(),
  isAssassin: [false, false],
  isAgent: [false, false],
  isBystander: [false, false],
});

const makePlayerState = (id) => ({
  id,
  successfulTurnCount: 0,
});

export const getInitialState = () => ({
  cards: range(25).map((index) => makeCardState(index)),
  players: range(2).map((index) => makePlayerState(index)),
  sideboard: {
    maxTurns: 9,
  },
  flags: {
    adminBoard: false,
  },
  adminMode: false,
});
