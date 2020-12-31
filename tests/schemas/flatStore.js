import { strictObject } from './utils';
import { sideboard } from './sideboard';

export const flatStore = strictObject({
  cards: true, // TODO: define schema
  players: true, // TODO: define schema
  sideboard,
  turnsTaken: {
    type: 'integer',
    minimum: 0,
    maximum: 20, // for testing purposes only
  },
});
