import { strictObject, strictTuple } from './utils';

const status = {
  enum: [
    null,
    'agent',
    'assassin',
    'bystander',
  ],
};

export const card = strictObject({
  id: {
    type: 'integer',
    minimum: 0,
    maximum: 24,
  },
  word: {
    type: 'string',
    minLength: 0,
    maxLength: 20, // for testing purposes only
  },
  status: strictTuple([status, status]),
});

export const buildCardSchema = (id) => strictObject({
  ...card.properties,
  id: { const: id },
});
