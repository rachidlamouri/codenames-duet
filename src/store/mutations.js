/* eslint-disable no-param-reassign */

import Vue from 'vue';

export const mutations = {
  updateSuccessfulTurnCount(state, { playerId, count }) {
    state.players[playerId].successfulTurnCount = count;
  },
  toggleCardState(state, { cardId, key, playerId }) {
    Vue.set(state.cards[cardId][key], playerId, !state.cards[cardId][key][playerId]);
  },
  toggleAdminMode(state) {
    state.adminMode = !state.adminMode;
  },
};
