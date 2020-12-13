<template>
  <div
    class="counter-like"
    @click="$emit('click')"
  />
</template>

<style lang="scss" scoped>
  @import './variables';

  div {
    background-color: $primary;
  }
</style>
