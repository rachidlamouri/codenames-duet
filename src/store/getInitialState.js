import { utils } from '../utils';

const makeCardState = (id) => ({
  id,
  word: utils.getWord(),
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
  flags: {
    adminBoard: false,
  },
  adminMode: false,
});
