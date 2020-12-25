import Vue from 'vue';
import Vuex from 'vuex';
import dictionary from './dictionary';

const range = (count) => Array.from({ length: count }).map((value, index) => index);

const getWord = () => {
  const wordIndex = Math.floor(Math.random() * dictionary.length);
  return dictionary[wordIndex];
};

const makeCardState = (id) => ({
  id,
  word: getWord().toUpperCase(),
  isAssassin: [false, false],
  isAgent: [false, false],
  isBystander: [false, false],
});

const makePlayerState = (id) => ({
  id,
  successfulTurnCount: 0,
});

export default new Vuex.Store({
  state: {
    cards: range(25).map((index) => makeCardState(index)),
    players: range(2).map((index) => makePlayerState(index)),
    sideboard: {
      maxTurns: 9,
    },
  },
  getters: {
    turnsTaken: (state) => {
      const successfulTurns = state.players.reduce(
        (turnsTaken, player) => turnsTaken + player.successfulTurnCount,
        0,
      );

      const failedTurns = state.cards.reduce(
        (turnsTaken, card) => {
          const player0TurnsTaken = card.isBystander[0] ? 1 : 0;
          const player1TurnsTaken = card.isBystander[1] ? 1 : 0;

          return turnsTaken + player0TurnsTaken + player1TurnsTaken;
        },
        0,
      );

      return successfulTurns + failedTurns;
    },
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    updateSuccessfulTurnCount(state, { playerId, count }) {
      state.players[playerId].successfulTurnCount = count;
    },
    toggleCardState(state, { cardId, key, playerId }) {
      Vue.set(state.cards[cardId][key], playerId, !state.cards[cardId][key][playerId]);
    },
    /* eslint-enable no-param-reassign */
  },
});
