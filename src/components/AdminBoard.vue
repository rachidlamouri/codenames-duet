<template>
  <div class="admin-board">
    <lil-button
      class="admin-button-top"
      :activated="adminMode"
      @click="toggleAdminMode()"
    />
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
    "." auto
    "bottom" constants.$lil-button-size;

    .admin-button-top {
      grid-area: top;
    }

    .admin-button-bottom {
      grid-area: bottom;
    }
  }
</style>
