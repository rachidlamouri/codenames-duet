<template>
  <div
    class="turn-counter counter-like"
    :class="type"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './variables';

  .turn-counter {
    &.player {
      background-color: $primary;
    }

    &.remaining {
      background-color: $accent-dark;
    }

    &.error {
      background-color: $error;
    }
  }
</style>
