import { utils } from '../../src/utils';
import { strictObject, strictTuple } from './utils';
import { buildPlayerSchema } from './player';
import { sideboard } from './sideboard';

export const storeState = strictObject({
  cards: true, // TODO: define schema
  players: strictTuple(utils.range(2).map((index) => buildPlayerSchema(index))),
  sideboard,
});
