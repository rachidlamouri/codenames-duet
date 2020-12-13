<template>
  <div class="player-board">
    <button
      class="add-counter counter-like"
      @click="addSuccessCounter"
    />
    <turn-counter
      v-for="index in player.successfulTurnCount"
      :key="`player-turn-counter-${player.id}${index}`"
      type="player"
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
    align-items: center;

    $starting-edge-offset: 400px;
    &.player-board-0 {
      flex-direction: row-reverse;
      padding-right: $starting-edge-offset;
    }

    &.player-board-1 {
      padding-left: $starting-edge-offset;
    }

    .add-counter {
      border-radius: 100%;
    }
  }
</style>
