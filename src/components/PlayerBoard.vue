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
import { mapState, mapMutations } from 'vuex';
import TurnCounter from './TurnCounter.vue';

export default {
  components: {
    TurnCounter,
  },
  props: {
    playerId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(['players']),
    player() {
      return this.players[this.playerId];
    },
  },
  methods: {
    ...mapMutations([
      'updateSuccessfulTurnCount',
    ]),
    addSuccessCounter() {
      this.updateSuccessfulTurnCount({
        playerId: this.player.id,
        count: this.player.successfulTurnCount + 1,
      });
    },
    removeSuccessCounter() {
      this.updateSuccessfulTurnCount({
        playerId: this.player.id,
        count: this.player.successfulTurnCount - 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @use 'styles/colors';

  .player-board {
    display: flex;
    align-items: center;

    $starting-edge-offset: 400px;
    &#player-board-0 {
      flex-direction: row-reverse;
      padding-right: $starting-edge-offset;
    }

    &#player-board-1 {
      padding-left: $starting-edge-offset;
    }

    .add-counter {
      background-color: colors.$accent-light;
      border-radius: 100%;
    }
  }
</style>
