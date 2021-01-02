<template>
  <div class="player-board">
    <lil-button
      class="lil-button-top"
      :activated="resetState[0]"
      @click="reset(0)"
    />
    <div class="turn-counters">
      <turn-counter
        v-for="index in remainingCount"
        :key="`remaining-turn-counter-${index}`"
        :type="isInErrorState ? 'error' : 'remaining'"
      />
    </div>
    <lil-button
      class="lil-button-bottom"
      :activated="resetState[1]"
      @click="reset(1)"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapState } from 'vuex';
import LilButton from './LilButton.vue';
import TurnCounter from './TurnCounter.vue';

export default {
  components: {
    LilButton,
    TurnCounter,
  },
  data() {
    return {
      resetState: [false, false],
    };
  },
  computed: {
    ...mapState(['sideboard']),
    ...mapGetters(['turnsTaken']),
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
  @use 'styles/padding';
  @use 'styles/constants';

  #side-board {
    display: grid;
    grid-template-columns: 1;
    grid-template-rows: constants.$lil-button-size auto constants.$lil-button-size;

    .lil-button-top {
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
        margin-bottom: padding.$sm;
      }
    }

    .lil-button-bottom {
      grid-row-start: 3;
      grid-row-end: 4;
    }
  }
</style>
