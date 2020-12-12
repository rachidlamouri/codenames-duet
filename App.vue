<template>
  <div>
    <div id="title">
      <h1>Hello</h1>
      <h1>Hello</h1>
    </div>
    <div
      v-for="{ index, word } in cards"
      :key="index"
    >
      {{ word }}
    </div>
    <button @click="reset">
      Reset
    </button>
  </div>
</template>

<script>
const makeCardState = (word, index) => ({
  index,
  word,
  isAssassin: [false, false],
  isAgent: [false, false],
  isBystander: [false, false],
});

const makePlayerState = () => ({
  successfulTurnCount: 0,
});

export default {
  data() {
    return {
      cards: Array.from({ length: 25 }).map((value, index) => makeCardState(index, index)),
      players: [makePlayerState(), makePlayerState()],
      sideboard: {
        maxTurns: 9,
      },
    };
  },
  methods: {
    reset() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
  @import './colors';

  * {
    color: $primary;
  }

  #title {
    display: flex;
    flex-direction: column;
  }

  #title h1:nth-of-type(2) {
    transform: rotate(-180deg);
  }
</style>
