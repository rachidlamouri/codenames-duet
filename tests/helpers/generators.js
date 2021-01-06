import Vuex from 'vuex';
import { schemasToGenerators } from '@randograms/schema-to-generator';
import { utils } from 'src/utils';
import * as schemas from './schemas';

const upperFirst = (string) => {
  const [first, ...rest] = string.split('');
  return first.toUpperCase() + rest.join('');
};

export const {
  genCard,
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

export const genMockStore = ({
  reload = utils.noop,
  updateCardStatus = utils.noop,
  updateSuccessfulTurnCount = utils.noop,
  ...override
} = {}) => {
  const {
    turnsTaken,
    ...state
  } = genFlatStore(override);

  return new Vuex.Store({
    state,
    getters: {
      turnsTaken: () => turnsTaken,
    },
    mutations: {
      updateCardStatus,
      updateSuccessfulTurnCount,
    },
    actions: {
      reload,
    },
  });
};
