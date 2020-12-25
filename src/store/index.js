import Vuex from 'vuex';
import { getInitialState } from './getInitialState';
import { getters } from './getters';
import { mutations } from './mutations';

export default new Vuex.Store({
  state: getInitialState(),
  getters,
  mutations,
});
