const { Element } = require('./element');

class PlayerBoard extends Element {
  static async playerBoard0(page) {
    return new PlayerBoard(await page.$('#player-board-0'));
  }

  static async playerBoard1(page) {
    return new PlayerBoard(await page.$('#player-board-1'));
  }

  async addCounterButton() {
    return new Element(await this.element.$('.add-counter'));
  }

  async successfulTurnCounters() {
    const handles = await this.element.$$('.turn-counter');
    return handles.map((handle) => new Element(handle));
  }
}

module.exports = { PlayerBoard };
