<template>
  <div class="card-board">
    <card
      v-for="card in cards"
      :key="card.id"
      :card="card"
    />
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  components: {
    Card,
  },
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.card-board {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
