<template>
  <button @click="reset" />
</template>

<script>
export default {
  methods: {
    reset() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './variables';

  button {
    width: $reset-button-size;
    height: $reset-button-size;
    background-color: $accent-light;
    border-radius: 25%;
  }
</style>
