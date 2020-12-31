<template>
  <div id="root">
    <side-board id="side-board" />
    <card-board id="card-board" />
    <player-board
      class="player-board-0"
      :player-id="0"
    />
    <player-board
      class="player-board-1"
      :player-id="1"
    />
  </div>
</template>

<script>
import CardBoard from './CardBoard.vue';
import PlayerBoard from './PlayerBoard.vue';
import SideBoard from './SideBoard.vue';

export default {
  components: {
    PlayerBoard,
    CardBoard,
    SideBoard,
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
    grid-template-columns: $edge-board-size auto;
    grid-template-rows: $edge-board-size auto $edge-board-size;
    width: 100%;
    height: 100%;
    padding: padding.$lg;
  }

  #side-board {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 4;
  }

  .player-board-0 {
    grid-column-start: 2;
    grid-row-end: 2;
  }

  #card-board {
    grid-column-start: 2;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .player-board-1 {
    grid-column-start: 2;
    grid-row-start: 3;
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
