import { strictObject, strictTuple } from './utils';

const status = {
  enum: [
    null,
    'agent',
    'assassin',
    'bystander',
  ],
};

// TODO: update getters.turnsTaken and Card.vue to use "status"
export const buildCardSchema = (id) => strictObject({
  id: { const: id },
  word: {
    type: 'string',
    minLength: 0,
    maxLength: 20, // for testing purposes only
  },
  status: strictTuple([status, status]),
});
