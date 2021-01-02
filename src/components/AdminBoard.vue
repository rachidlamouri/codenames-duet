<template>
  <div class="admin-board">
    <lil-button
      class="admin-button-top"
      :activated="adminMode"
      @click="toggleAdminMode()"
    />
    <div
      v-if="adminMode"
      class="admin-text"
    >
      WELCOME TO ADMIN MODE!
    </div>
    <lil-button
      class="admin-button-bottom"
      :activated="adminMode"
      @click="toggleAdminMode()"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import LilButton from './LilButton.vue';

export default {
  components: {
    LilButton,
  },
  computed: {
    ...mapState(['adminMode']),
  },
  methods: {
    ...mapMutations(['toggleAdminMode']),
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
    "text" auto
    "bottom" constants.$lil-button-size;

    .admin-button-top {
      grid-area: top;
    }

    .admin-button-bottom {
      grid-area: bottom;
    }

    .admin-text {
      grid-area: text;
      text-align: center;
      writing-mode: vertical-rl;
      text-orientation: sideways-right;
      color: colors.$error;
      font-size: constants.$lil-button-size;
    }
  }
</style>
