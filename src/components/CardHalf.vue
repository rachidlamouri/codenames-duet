<template>
  <div
    class="card-half"
    :class="[card.status[playerId], position]"
    @click="toggleButtons"
  >
    <div class="word">
      {{ card.word }}
    </div>
    <div class="button-group">
      <button
        v-if="showButtons"
        class="reset"
        @click="setStatus(null)"
      />
      <button
        v-if="showButtons"
        class="assassin"
        @click="setStatus('assassin')"
      />
      <button
        v-if="showButtons"
        class="bystander"
        @click="setStatus('bystander')"
      />
      <button
        v-if="showButtons"
        class="agent"
        @click="setStatus('agent')"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
    playerId: {
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
    position() {
      return this.playerId === 0 ? 'top' : 'bottom';
    },
  },
  methods: {
    ...mapMutations(['updateCardStatus']),
    toggleButtons() {
      this.showButtons = !this.showButtons;
    },
    setStatus(status) {
      this.updateCardStatus({
        cardId: this.card.id,
        playerId: this.playerId,
        status,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @use 'styles/colors';
  @use 'styles/padding';

  .card-half {
    display: flex;
    flex-direction: column;
    flex: 1;
    flex-shrink: 0;
    border-radius: 5px 5px 0px 0px;
    padding: padding.$md;
    padding-bottom: padding.$sm;
    font-size: 25px;

    &.bottom {
      transform: rotate(-180deg);
      font-style: italic;
    }

    &.agent,
    &.assassin,
    &.bystander {
      color: colors.$accent-light;
      border-bottom: 0.5px solid colors.$accent-light;
    }

    &.agent {
      background-color: colors.$success;
    }

    &.assassin {
      background-color: colors.$assassin;
    }

    &.bystander {
      background-color: colors.$accent-dark;
    }

    .button-group {
      display: flex;

      $size: 40px;
      button {
        width: $size;
        height: $size;
        margin-right: padding.$sm;
        border-radius: 20%;
        border: 1px solid white;

        &.agent {
          background-color: colors.$success;
        }

        &.bystander {
          background-color: colors.$accent-dark;
        }

        &.assassin {
          background-color: colors.$assassin;
        }

        &.reset {
          background-color: colors.$accent-light;
          border-color: colors.$accent-dark;
        }
      }
    }
  }
</style>
