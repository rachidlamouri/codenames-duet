import Vuex from 'vuex';
import { schemasToGenerators } from '@randograms/schema-to-generator';
import * as schemas from './schemas';

const upperFirst = (string) => {
  const [first, ...rest] = string.split('');
  return first.toUpperCase() + rest.join('');
};

export const {
  genFlatStore,
  genStoreState,
} = Object.entries(schemasToGenerators(schemas))
  .map(([name, generator]) => [`gen${upperFirst(name)}`, generator])
  .reduce(
    (generators, [name, generator]) => {
      generators[name] = generator; // eslint-disable-line no-param-reassign
      return generators;
    },
    {},
  );

const noop = () => undefined;

export const genMockStore = ({
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
