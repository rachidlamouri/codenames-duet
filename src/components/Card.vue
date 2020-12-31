<template>
  <div
    class="card"
    @click="toggleButtons"
  >
    <div
      class="word top"
      :class="topWordClasses"
    >
      {{ card.word }}
    </div>
    <div class="space" />
    <div
      class="word bottom"
      :class="bottomWordClasses"
    >
      {{ card.word }}
    </div>
    <div
      v-show="showButtons"
      class="buttons"
    >
      <div class="row top">
        <button
          class="assassin"
          @click="toggleAssassin(0)"
        />
        <button
          class="innocent-bystander"
          @click="toggleInnocentBystander(0)"
        />
        <button
          class="agent"
          @click="toggleAgent(0)"
        />
      </div>
      <div class="row bottom">
        <button
          class="agent"
          @click="toggleAgent(1)"
        />
        <button
          class="innocent-bystander"
          @click="toggleInnocentBystander(1)"
        />
        <button
          class="assassin"
          @click="toggleAssassin(1)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  props: {
    cardId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showButtons: false,
    };
  },
  computed: {
    ...mapState(['cards']),
    card() {
      return this.cards[this.cardId];
    },
    topWordClasses() {
      return {
        agent: this.card.isAgent[0],
        'innocent-bystander': this.card.isBystander[0],
        assassin: this.card.isAssassin[0],
      };
    },
    bottomWordClasses() {
      return {
        agent: this.card.isAgent[1],
        'innocent-bystander': this.card.isBystander[1],
        assassin: this.card.isAssassin[1],
      };
    },
  },
  methods: {
    ...mapMutations(['toggleCardState']),
    toggleButtons() {
      this.showButtons = !this.showButtons;
    },
    toggleAssassin(playerId) {
      this.toggleCardState({
        cardId: this.card.id,
        playerId,
        key: 'isAssassin',
      });
    },
    toggleAgent(playerId) {
      this.toggleCardState({
        cardId: this.card.id,
        playerId,
        key: 'isAgent',
      });
    },
    toggleInnocentBystander(playerId) {
      this.toggleCardState({
        cardId: this.card.id,
        playerId,
        key: 'isBystander',
      });
    },
  },
};
</script>

<style scoped lang="scss">
@use 'styles/colors';
@use 'styles/constants';
@use 'styles/padding';

.card {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: constants.$card-margin;
  border: 1px solid colors.$borders;
  border-radius: 5px;
  font-size: 25px;
  background-color: colors.$accent-light;

  .word {
    padding: padding.$lg;
    flex-shrink: 0;

    &.bottom {
      transform: rotate(-180deg);
      font-style: italic;
    }

    &.agent {
      color: colors.$accent-light;
      background-color: colors.$success;
    }

    &.assassin {
      color: colors.$accent-light;
      background-color: colors.$assassin;
    }

    &.innocent-bystander {
      color: colors.$accent-light;
      background-color: colors.$accent-dark;
    }
  }

  .space {
    flex-grow: 1;
  }

  .buttons {
    position: absolute;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: padding.$md;

    .row {
      display: flex;
      flex-shrink: 0px;

      &.top {
        margin-bottom: padding.$lg;
      }

      $size: 40px;
      button {
        width: $size;
        height: $size;
        margin-right: padding.$md;
        border-radius: 20%;
        border: 1px solid white;

        &.agent {
          background-color: colors.$success;
        }

        &.innocent-bystander {
          background-color: colors.$accent-dark;
        }

        &.assassin {
          background-color: colors.$assassin;
        }
      }
    }
  }
}

</style>
