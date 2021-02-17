const { Card } = require('./card');
const { ResetButton } = require('./resetButton');
const { SideCounter } = require('./sideCounter');
const { PlayerBoard } = require('./playerBoard');

module.exports.Model = class {
  constructor(page) {
    this.page = page;
  }

  async cards() {
    return Card.getAll(this.page);
  }

  async topResetButton() {
    return ResetButton.top(this.page);
  }

  async bottomResetButton() {
    return ResetButton.bottom(this.page);
  }

  async sideCounters() {
    return SideCounter.getAll(this.page);
  }

  async errorSideCounters() {
    return SideCounter.getAllError(this.page);
  }

  async playerBoard(playerId) {
    switch (playerId) {
      case 0: return PlayerBoard.playerBoard0(this.page);
      case 1: return PlayerBoard.playerBoard1(this.page);
      default: throw Error(`Unknown playerId ${playerId}`);
    }
  }
};
