<template>
  <div class="player-board">
    <button
      class="add-counter counter-like"
      @click="addSuccessCounter"
    />
    <turn-counter
      v-for="index in player.successfulTurnCount"
      :key="`turn-counter-${player.id}${index}`"
      @click="removeSuccessCounter"
    />
  </div>
</template>

<script>
import TurnCounter from './TurnCounter.vue';

export default {
  components: {
    TurnCounter,
  },
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addSuccessCounter() {
      this.$emit('updateSuccessfulTurnCount', {
        playerId: this.player.id,
        count: this.player.successfulTurnCount + 1,
      });
    },
    removeSuccessCounter() {
      this.$emit('updateSuccessfulTurnCount', {
        playerId: this.player.id,
        count: this.player.successfulTurnCount - 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import 'variables.scss';

  .player-board {
    display: flex;

    .add-counter {
      border-radius: 100px;
    }
  }
</style>
