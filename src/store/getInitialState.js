import dictionary from '../dictionary';
import { utils } from '../utils';

const getWord = () => {
  const wordIndex = Math.floor(Math.random() * dictionary.length);
  return dictionary[wordIndex];
};

const makeCardState = (id) => ({
  id,
  word: getWord().toUpperCase(),
  status: [null, null],
});

const makePlayerState = (id) => ({
  id,
  successfulTurnCount: 0,
});

export const getInitialState = () => ({
  cards: utils.range(25).map((index) => makeCardState(index)),
  players: utils.range(2).map((index) => makePlayerState(index)),
  sideboard: {
    maxTurns: 9,
  },
});
