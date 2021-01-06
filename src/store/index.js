import Vuex from 'vuex';
import { getInitialState } from './getInitialState';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

export default new Vuex.Store({
  state: getInitialState(),
  getters,
  mutations,
  actions,
});
