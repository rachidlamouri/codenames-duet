import Vuex from 'vuex';
import { schemaToGenerator } from '@randograms/schema-to-generator';
import { flatStore } from './schemas/flatStore';

const noop = () => undefined;

const genFlatStore = schemaToGenerator(flatStore);

export const genStore = ({
  reload = noop,
  ...override
} = {}) => {
  const {
    sideboard,
    turnsTaken,
  } = genFlatStore(override);

  return new Vuex.Store({
    state: {
      sideboard,
    },
    getters: {
      turnsTaken: () => turnsTaken,
    },
    actions: {
      reload,
    },
  });
};
