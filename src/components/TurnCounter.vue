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
  @use 'styles/colors';

  .turn-counter {
    &.player {
      background-color: colors.$success;
    }

    &.normal {
      background-color: colors.$accent-dark;
    }

    &.error {
      background-color: colors.$error;
    }
  }
</style>
