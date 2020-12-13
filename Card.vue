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

export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showButtons: false,
    };
  },
  computed: {
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
    toggleButtons() {
      this.showButtons = !this.showButtons;
    },
    toggleAssassin(playerId) {
      this.$emit('toggleCardState', {
        cardId: this.card.id,
        playerId,
        key: 'isAssassin',
      });
    },
    toggleAgent(playerId) {
      this.$emit('toggleCardState', {
        cardId: this.card.id,
        playerId,
        key: 'isAgent',
      });
    },
    toggleInnocentBystander(playerId) {
      this.$emit('toggleCardState', {
        cardId: this.card.id,
        playerId,
        key: 'isBystander',
      });
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
  border: 1px solid $borders;
  border-radius: 5px;
  font-size: 25px;
  background-color: $accent-light;

  .word {
    padding: $padding-lg;
    flex-shrink: 0;

    &.bottom {
      transform: rotate(-180deg);
      font-style: italic;
    }

    &.agent {
      color: $accent-light;
      background-color: $success;
    }

    &.assassin {
      color: $accent-light;
      background-color: $assassin;
    }

    &.innocent-bystander {
      color: $accent-light;
      background-color: $accent-dark;
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
    padding: $padding-md;

    .row {
      display: flex;
      flex-shrink: 0px;

      &.top {
        margin-bottom: $padding-lg;
      }

      $size: 40px;
      button {
        width: $size;
        height: $size;
        margin-right: $padding-md;
        border-radius: 20%;
        border: 1px solid white;

        &.agent {
          background-color: $success;
        }

        &.innocent-bystander {
          background-color: $accent-dark;
        }

        &.assassin {
          background-color: $assassin;
        }
      }
    }
  }
}

</style>
