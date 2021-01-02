/* eslint-disable no-param-reassign */

import Vue from 'vue';

export const mutations = {
  updateSuccessfulTurnCount(state, { playerId, count }) {
    state.players[playerId].successfulTurnCount = count;
  },
  updateCardStatus(state, { cardId, playerId, status }) {
    if (![null, 'agent', 'assassin', 'bystander'].includes(status)) {
      throw Error(`Invalid status "${status}"`);
    }

    Vue.set(state.cards[cardId].status, playerId, status);
  },
};
