<template>
  <div class="card-board">
    <div
      v-for="rowId in 5"
      :key="`card-row-${rowId}`"
      class="row"
    >
      <card
        v-for="card in getCards(rowId - 1)"
        :key="`card-${card.id}`"
        :card="card"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from './Card.vue';

export default {
  components: {
    Card,
  },
  computed: {
    ...mapState(['cards']),
  },
  methods: {
    getCards(rowId) {
      const start = rowId * 5;
      return this.cards.slice(start, start + 5);
    },
  },
};
</script>

<style scoped lang="scss">
@import './variables';

#card-board {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  padding: $card-margin;

  .row {
    display: flex;
    flex: 1;
  }
}
</style>
