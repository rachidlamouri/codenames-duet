<template>
  <div class="card">
    <div class="word top">{{ card.word }}</div>
    <div class="space" />
    <div class="word bottom">{{ card.word }}</div>
  </div>
</template>

<script>

export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import './variables';

.card {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: $card-margin;
  padding: $padding-lg;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 25px;

  .word {
    height: 20px;

    &.bottom {
      transform: rotate(-180deg);
      font-style: italic;
    }
  }

  .space {
    flex-grow: 1;
  }
}

</style>
