<template>
  <div id="root">
    <div id="sideboard">
      <button @click="reset">
        Reset
      </button>
    </div>
    <card-board :cards="cards" />
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
import PlayerBoard from './PlayerBoard.vue';
import CardBoard from './CardBoard.vue';
import dictionary from './dictionary';

const getWord = () => {
  const wordIndex = Math.floor(Math.random() * dictionary.length);
  return dictionary[wordIndex];
};

const makeCardState = (id) => ({
  id,
  word: getWord(),
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
  methods: {
    reset() {
      window.location.reload();
    },
    updateSuccessfulTurnCount({ playerId, count }) {
      this.players[playerId].successfulTurnCount = count;
    },
  },
};
</script>

<style lang="scss">
  @import './variables';

  * {
    box-sizing: border-box;
    color: $text;
    margin: 0px;
    padding: 0px;
    border: none;
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

  #sideboard {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 4;
  }

  .player-board-0 {
    grid-column-start: 2;
    grid-row-end: 2;
  }

  #cardboard {
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
