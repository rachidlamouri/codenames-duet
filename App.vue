<template>
  <div>
    <h1>Hello</h1>
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
</style>
