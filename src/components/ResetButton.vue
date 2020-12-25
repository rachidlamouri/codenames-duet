<template>
  <button
    :class="classes"
    @click="reset"
  />
</template>

<script>
export default {
  props: {
    activated: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    classes() {
      return {
        activated: this.activated,
      };
    },
  },
  methods: {
    reset() {
      this.$emit('reset');
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

    &.activated {
      background-color: $success;
    }
  }
</style>
