<template>
  <div class="admin-board">
    <lil-button
      class="admin-button-top"
      :activated="adminModeState[0]"
      @reset="adminMode(0)"
    />
    <lil-button
      class="admin-button-bottom"
      :activated="adminModeState[1]"
      @reset="adminMode(1)"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import LilButton from './LilButton.vue';

export default {
  components: {
    LilButton,
  },
  data() {
    return {
      adminModeState: [false, false],
    };
  },
  methods: {
    adminMode(playerId) {
      Vue.set(this.adminModeState, playerId, !this.adminModeState[playerId]);

      if (this.adminModeState.every((value) => value)) {
        console.log('Entering admin mode');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @use 'styles/constants';
  @use 'styles/colors';

  #admin-board {
    display: grid;
    grid:
    "top" constants.$lil-button-size
    "." auto
    "bottom" constants.$lil-button-size;

    .admin-button-top {
      grid-area: top;
    }

    .admin-button-bottom {
      grid-area: bottom;
    }

    button.activated {
      background-color: colors.$accent-dark;
    }
  }
</style>
