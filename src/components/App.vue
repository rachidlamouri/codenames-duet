<template>
  <div
    id="root"
  >
    <side-board id="side-board" />
    <card-board id="card-board" />
    <admin-board
      v-if="flags.adminBoard"
      id="admin-board"
    />
    <player-board
      id="player-board-0"
      :player-id="0"
    />
    <player-board
      id="player-board-1"
      :player-id="1"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CardBoard from './CardBoard.vue';
import PlayerBoard from './PlayerBoard.vue';
import SideBoard from './SideBoard.vue';
import AdminBoard from './AdminBoard.vue';

export default {
  components: {
    PlayerBoard,
    CardBoard,
    SideBoard,
    AdminBoard,
  },
  computed: {
    ...mapState(['adminMode', 'flags']),
  },
};
</script>

<style lang="scss">
  @use 'styles/colors';
  @use 'styles/padding';
  @use 'styles/constants';

  * {
    box-sizing: border-box;
    background-color: transparent;
    color: colors.$text;
    margin: 0px;
    padding: 0px;
    border: none;
    outline: none;
    font-family: sans-serif;
  }

  $edge-board-size: 100px;
  #root {
    display: grid;
    grid-template:
      "side player-0 admin" $edge-board-size
      "side card     admin" auto
      "side player-1 admin" $edge-board-size;
    grid-template-columns: $edge-board-size auto constants.$admin-board-width;
    width: 100%;
    height: 100%;
    padding: padding.$lg;
  }

  #side-board {
    grid-area: side;
  }

  #admin-board {
    grid-area: admin;
  }

  #player-board-0 {
    grid-area: player-0;
  }

  #player-board-1 {
    grid-area: player-1;
  }

  #card-board {
    grid-area: card;
  }

  .counter-like {
    width: constants.$counter-size;
    height: constants.$counter-size;
    border: 1px solid colors.$borders;
    border-radius: 10px;
    margin-left: padding.$sm;
  }

  #title {
    display: flex;
    flex-direction: column;
  }

  #title h1:nth-of-type(2) {
    transform: rotate(-180deg);
  }
</style>
