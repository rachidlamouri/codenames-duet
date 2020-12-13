<template>
  <div id="root">
    <side-board
      id="side-board"
      :sideboard="sideboard"
      :turns-taken="turnsTaken"
    />
    <card-board
      id="card-board"
      :cards="cards"
      @toggleCardState="toggleCardState"
    />
    <player-board
      v-for="player in players"
      :key="`player-board-${player.id}`"
      :class="`player-board-${player.id}`"
      :player="player"
      @updateSuccessfulTurnCount="updateSuccessfulTurnCount"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import CardBoard from './CardBoard.vue';
import PlayerBoard from './PlayerBoard.vue';
import SideBoard from './SideBoard.vue';
import dictionary from './dictionary';

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

const range = (count) => Array.from({ length: count }).map((value, index) => index);

export default {
  components: {
    PlayerBoard,
    CardBoard,
    SideBoard,
  },
  data() {
    return {
      cards: range(25).map((index) => makeCardState(index)),
      players: range(2).map((index) => makePlayerState(index)),
      sideboard: {
        maxTurns: 9,
      },
    };
  },
  computed: {
    turnsTaken() {
      const successfulTurns = this.players.reduce(
        (turnsTaken, player) => turnsTaken + player.successfulTurnCount,
        0,
      );

      const failedTurns = this.cards.reduce(
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
  methods: {
    updateSuccessfulTurnCount({ playerId, count }) {
      this.players[playerId].successfulTurnCount = count;
    },
    toggleCardState({ cardId, key, playerId }) {
      Vue.set(this.cards[cardId][key], playerId, !this.cards[cardId][key][playerId]);
    },
  },
};
</script>

<style lang="scss">
  @import './variables';

  * {
    box-sizing: border-box;
    background-color: transparent;
    color: $text;
    margin: 0px;
    padding: 0px;
    border: none;
    outline: none;
    font-family: sans-serif;
  }

  $edge-board-size: 100px;
  #root {
    display: grid;
    grid-template-columns: $edge-board-size auto;
    grid-template-rows: $edge-board-size auto $edge-board-size;
    width: 100%;
    height: 100%;
    padding: $padding-lg;
  }

  #side-board {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 4;
  }

  .player-board-0 {
    grid-column-start: 2;
    grid-row-end: 2;
  }

  #card-board {
    grid-column-start: 2;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .player-board-1 {
    grid-column-start: 2;
    grid-row-start: 3;
  }

  .counter-like {
    width: $counter-size;
    height: $counter-size;
    border: 1px solid $borders;
    border-radius: 10px;
    margin-left: $padding-sm;
  }

  #title {
    display: flex;
    flex-direction: column;
  }

  #title h1:nth-of-type(2) {
    transform: rotate(-180deg);
  }
</style>
