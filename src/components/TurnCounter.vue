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
      validator: (value) => ['error', 'normal', 'player'].includes(value),
    },
  },
};
</script>

<style lang="scss" scoped>
  @use 'styles/colors';

  .turn-counter {
    &.error {
      background-color: colors.$error;
    }

    &.normal {
      background-color: colors.$accent-dark;
    }

    &.player {
      background-color: colors.$success;
    }
  }
</style>
