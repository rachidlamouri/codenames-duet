/* eslint-disable no-param-reassign */

import Vue from 'vue';
import { utils } from '../utils';

export const mutations = {
  rerollWord(state, { id: cardId }) {
    Vue.set(state.cards[cardId], 'word', utils.getWord());
  },
  disallowWord(state, { id: cardId }) {
    console.log('DISALLOWING', state.cards[cardId].word);
    mutations.rerollWord(state, { id: cardId });
  },
  updateSuccessfulTurnCount(state, { playerId, count }) {
    state.players[playerId].successfulTurnCount = count;
  },
  updateCardStatus(state, { cardId, playerId, status }) {
    if (![null, 'agent', 'assassin', 'bystander'].includes(status)) {
      throw Error(`Invalid status "${status}"`);
    }

    Vue.set(state.cards[cardId].status, playerId, status);
  },
  toggleAdminMode(state) {
    state.adminMode = !state.adminMode;
  },
};
