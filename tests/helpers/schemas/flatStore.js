import { REALISTIC_POSITIVE_INTEGER, strictObject } from './utils';
import { storeState } from './storeState';

export const flatStore = strictObject({
  ...storeState.properties,
  turnsTaken: REALISTIC_POSITIVE_INTEGER,
});
