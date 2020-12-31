import { utils } from '../../src/utils';
import { REALISTIC_POSITIVE_INTEGER, strictObject, strictTuple } from './utils';
import { buildPlayerSchema } from './player';
import { sideboard } from './sideboard';

export const flatStore = strictObject({
  cards: true, // TODO: define schema
  players: strictTuple(utils.range(2).map((index) => buildPlayerSchema(index))),
  sideboard,
  turnsTaken: REALISTIC_POSITIVE_INTEGER,
});
