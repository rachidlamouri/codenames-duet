<template>
  <div class="player-board">
    <reset-button class="reset-button-top" />
    <div
      class="turn-counters"
      :class="classes"
    >
      <turn-counter
        v-for="index in remainingCount"
        :key="`remaining-turn-counter-${index}`"
        type="remaining"
      />
    </div>
    <reset-button class="reset-button-bottom" />
  </div>
</template>

<script>
import ResetButton from './ResetButton.vue';
import TurnCounter from './TurnCounter.vue';

export default {
  components: {
    ResetButton,
    TurnCounter,
  },
  props: {
    sideboard: {
      type: Object,
      required: true,
    },
    turnsTaken: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isInErrorState() {
      return this.turnsTaken > this.sideboard.maxTurns;
    },
    classes() {
      return {
        error: this.isInErrorState,
      };
    },
    remainingCount() {
      return this.isInErrorState ? 0 : this.sideboard.maxTurns - this.turnsTaken;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import 'variables.scss';

  #side-board {
    display: grid;
    grid-template-columns: 1;
    grid-template-rows: $reset-button-size auto $reset-button-size;

    .reset-button-top {
      grid-row-start: 1;
      grid-row-end: 2;
    }

    .turn-counters {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: center;
      grid-row-start: 2;
      grid-row-end: 3;

      &.error {
        background-color: $error;
      }

      .turn-counter {
        margin-bottom: $padding-sm;
      }
    }

    .reset-button-bottom {
      grid-row-start: 3;
      grid-row-end: 4;
    }
  }
</style>
