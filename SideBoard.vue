<template>
  <div class="player-board">
    <reset-button
      class="reset-button-top"
      :activated="resetState[0]"
      @reset="reset(0)"
    />
    <div class="turn-counters">
      <turn-counter
        v-for="index in remainingCount"
        :key="`remaining-turn-counter-${index}`"
        :type="isInErrorState ? 'error' : 'remaining'"
      />
    </div>
    <reset-button
      class="reset-button-bottom"
      :activated="resetState[1]"
      @reset="reset(1)"
    />
  </div>
</template>

<script>
import Vue from 'vue';
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
  data() {
    return {
      resetState: [false, false],
    };
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
      return this.isInErrorState
        ? this.turnsTaken - this.sideboard.maxTurns
        : this.sideboard.maxTurns - this.turnsTaken;
    },
  },
  methods: {
    reset(playerId) {
      Vue.set(this.resetState, playerId, !this.resetState[playerId]);

      if (this.resetState.every((value) => value)) {
        window.location.reload();
      }
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
