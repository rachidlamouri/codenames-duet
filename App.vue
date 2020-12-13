<template>
  <div>
    <div id="title">
      <h1>Hello</h1>
      <h1>Hello</h1>
    </div>
    <div
      v-for="{ id, word } in cards"
      :key="`card-${id}`"
    >
      {{ word }}
    </div>
    <button @click="reset">
      Reset
    </button>
    <player-board
      v-for="player in players"
      :key="`player-${player.id}`"
      :player="player"
      @updateSuccessfulTurnCount="updateSuccessfulTurnCount"
    />
  </div>
</template>

<script>
import PlayerBoard from './PlayerBoard.vue';
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
