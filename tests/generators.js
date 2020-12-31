import Vuex from 'vuex';
import { schemaToGenerator } from '@randograms/schema-to-generator';
import { flatStore } from './schemas/flatStore';

const noop = () => undefined;

const genFlatStore = schemaToGenerator(flatStore);

export const genStore = ({
  reload = noop,
  updateSuccessfulTurnCount = noop,
  ...override
} = {}) => {
  const {
    players,
    sideboard,
    turnsTaken,
  } = genFlatStore(override);

  return new Vuex.Store({
    state: {
      players,
      sideboard,
    },
    getters: {
      turnsTaken: () => turnsTaken,
    },
    mutations: {
      updateSuccessfulTurnCount,
    },
    actions: {
      reload,
    },
  });
};
