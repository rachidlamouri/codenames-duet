<template>
  <div>
    <lil-button
      class="reset-button top"
      type="green"
      :activated="resetState[0]"
      @click="reset(0)"
    />
    <div class="turn-counters">
      <turn-counter
        v-for="index in remainingCount"
        :key="`remaining-turn-counter-${index}`"
        :type="isInErrorState ? 'error' : 'normal'"
      />
    </div>
    <lil-button
      class="reset-button bottom"
      type="green"
      :activated="resetState[1]"
      @click="reset(1)"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
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
    ...mapActions(['reload']),
    reset(playerId) {
      Vue.set(this.resetState, playerId, !this.resetState[playerId]);

      if (this.resetState.every((value) => value)) {
        this.reload();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @use 'styles/padding';
  @use 'styles/constants';
  @use 'styles/colors';

  #side-board {
    display: grid;
    grid-template-columns: 1;
    grid-template-rows: constants.$lil-button-size auto constants.$lil-button-size;

    .reset-button.top {
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

    .reset-button.bottom {
      grid-row-start: 3;
      grid-row-end: 4;
    }
  }
</style>
