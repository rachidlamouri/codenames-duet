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
  @use 'styles/colors';
  @use 'styles/constants';

  button {
    width: constants.$lil-button-size;
    height: constants.$lil-button-size;
    background-color: colors.$accent-light;
    border-radius: 25%;

    &.activated {
      background-color: colors.$success;
    }
  }
</style>
