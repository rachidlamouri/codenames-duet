import { REALISTIC_POSITIVE_INTEGER, strictObject } from './utils';

export const buildPlayerSchema = (id) => strictObject({
  id: { const: id },
  successfulTurnCount: REALISTIC_POSITIVE_INTEGER,
});
