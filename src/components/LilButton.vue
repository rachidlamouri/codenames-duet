<template>
  <button
    :class="classes"
    @click="click"
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
    click() {
      this.$emit('click');
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
