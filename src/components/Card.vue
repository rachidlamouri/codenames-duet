<template>
  <div class="card">
    <card-half
      :card="card"
      :player-id="0"
    />
    <card-half
      :card="card"
      :player-id="1"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CardHalf from './CardHalf.vue';

export default {
  components: {
    CardHalf,
  },
  props: {
    cardId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(['cards']),
    card() {
      return this.cards[this.cardId];
    },
  },
};
</script>

<style scoped lang="scss">
@use 'styles/colors';
@use 'styles/constants';

.card {
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-shrink: 0;
  border: 1px solid colors.$borders;
  border-radius: 5px;
  margin: constants.$card-margin;
  background-color: colors.$accent-light;
}

</style>
