<template>
  <div class="card-board">
    <div
      v-for="rowNum in 5"
      :key="`card-row-${rowNum}`"
      class="row"
    >
      <card
        v-for="colNum in 5"
        :key="`card-${getCardId(rowNum, colNum)}`"
        :card-id="getCardId(rowNum, colNum)"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  components: {
    Card,
  },
  methods: {
    getCardId(rowNum, colNum) {
      return (rowNum - 1) * 5 + (colNum - 1);
    },
  },
};
</script>

<style scoped lang="scss">
@use 'styles/constants';

#card-board {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  padding: constants.$card-margin;

  .row {
    display: flex;
    flex: 1;
  }
}
</style>
