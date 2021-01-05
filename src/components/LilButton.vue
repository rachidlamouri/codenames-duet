<template>
  <button
    :class="classes"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  props: {
    activated: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      default: 'grey',
      validator: (v) => ['green', 'grey'].indexOf(v) >= 0,
    },
  },
  computed: {
    classes() {
      return {
        [this.type]: true,
        activated: this.activated,
      };
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
      &.green {
        background-color: colors.$success;
      }

      &.grey {
        background-color: colors.$accent-dark;
      }
    }
  }
</style>
