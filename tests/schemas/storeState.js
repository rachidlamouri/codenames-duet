import { utils } from '../../src/utils';
import { BOOLEAN, strictObject, strictTuple } from './utils';
import { buildCardSchema } from './card';
import { buildPlayerSchema } from './player';
import { sideboard } from './sideboard';

export const storeState = strictObject({
  cards: strictTuple(utils.range(25).map((index) => buildCardSchema(index))),
  players: strictTuple(utils.range(2).map((index) => buildPlayerSchema(index))),
  sideboard,
  flags: strictObject({
    adminBoard: BOOLEAN,
  }),
  adminMode: BOOLEAN,
});
