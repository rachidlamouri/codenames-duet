<template>
  <div class="card-board">
    <card
      v-for="indexFrom1 in 25"
      :key="`card-${indexFrom1 - 1}`"
      :card-id="indexFrom1 - 1"
    />
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  components: {
    Card,
  },
};
</script>

<style scoped lang="scss">
@use 'styles/constants';

#card-board {
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(5, 20%);
  padding: constants.$card-margin;
}
</style>
